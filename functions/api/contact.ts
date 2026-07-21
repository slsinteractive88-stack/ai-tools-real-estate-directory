export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'privacy-request' | 'listing-submission' | 'listing-removal' | 'listing-update';
}

const SUBJECT_LABELS: Record<string, string> = {
  general: 'contact-form',
  'listing-submission': 'contact-form,listing-submission',
  'listing-removal': 'contact-form,listing-removal',
  'listing-update': 'contact-form,listing-update',
  'privacy-request': 'contact-form,privacy-request,gdpr',
  advertising: 'contact-form,advertising',
  partnership: 'contact-form,partnership',
  technical: 'contact-form,technical',
  other: 'contact-form',
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

async function createGitHubIssue(
  data: ContactFormData,
  token: string,
  repo: string
): Promise<{ number: number; url: string }> {
  const labels = SUBJECT_LABELS[data.type] || 'contact-form';
  const labelArray = labels.split(',').map(l => l.trim());

  const body = `## Contact Form Submission

**Type:** ${data.type}
**Name:** ${data.name}
**Email:** ${data.email}
**Subject:** ${data.subject}
**Submitted:** ${new Date().toISOString()}

---

### Message

${data.message}

---

*This issue was created automatically from the contact form on realtyaivault.com*`;

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `Contact: ${data.subject} (${data.name})`,
      body,
      labels: labelArray,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API error: ${error.message || response.statusText}`);
  }

  const issue = await response.json();
  return { number: issue.number, url: issue.html_url };
}

export async function onRequestPost(context: { request: Request; env: { GITHUB_TOKEN: string; GITHUB_REPO: string } }): Promise<Response> {
  try {
    const data = (await context.request.json()) as ContactFormData;
    const errors = validateFormData(data);

    if (errors.length > 0) {
      return new Response(JSON.stringify({ success: false, error: errors.join(', ') }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { GITHUB_TOKEN, GITHUB_REPO } = context.env;

    if (!GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN not configured');
      return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const issue = await createGitHubIssue(data, GITHUB_TOKEN, GITHUB_REPO || 'slsinteractive88-stack/ai-tools-real-estate-directory');

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
    return new Response(JSON.stringify({ success: false, error: 'Failed to submit. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}