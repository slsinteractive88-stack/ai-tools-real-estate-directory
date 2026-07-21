export interface Env {
  GITHUB_TOKEN: string;
  GITHUB_REPO: string;
}

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
}

const TYPE_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  'privacy-request': 'Privacy / Data Request (GDPR)',
  'listing-submission': 'Submit a New Tool Listing',
  'listing-removal': 'Request Listing Removal',
  'listing-update': 'Update Existing Listing',
};

function validateFormData(data: ContactFormData): string[] {
  const errors: string[] = [];
  if (!data.name.trim()) errors.push('Name is required');
  if (!data.email.trim()) errors.push('Email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email format');
  if (!data.subject.trim()) errors.push('Subject is required');
  if (!data.message.trim()) errors.push('Message is required');
  else if (data.message.length < 20) errors.push('Message must be at least 20 characters');
  return errors;
}

function generateIssueBody(data: ContactFormData): string {
  const typeLabel = TYPE_LABELS[data.type] || data.type;
  return `## Contact Form Submission

**Type:** ${typeLabel}
**Name:** ${data.name}
**Email:** ${data.email}
**Subject:** ${data.subject}
**Submitted:** ${new Date().toISOString()}

---

### Message

${data.message}

---

*This issue was created automatically from the contact form on realtyaivault.com*`;
}

async function createGitHubIssue(env: Env, data: ContactFormData): Promise<{ number: number; url: string }> {
  const labels = ['contact-form', data.type];
  
  const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `Contact: ${data.subject} (${data.name})`,
      body: generateIssueBody(data),
      labels,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API error: ${error.message || response.statusText}`);
  }

  const issue = await response.json();
  return { number: issue.number, url: issue.html_url };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const data: ContactFormData = await request.json();
      const errors = validateFormData(data);

      if (errors.length > 0) {
        return new Response(JSON.stringify({ error: errors.join(', ') }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const issue = await createGitHubIssue(env, data);

      return new Response(
        JSON.stringify({
          success: true,
          issueNumber: issue.number,
          issueUrl: issue.url,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Contact form error:', error);
      return new Response(JSON.stringify({ error: 'Failed to submit. Please try again later.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};