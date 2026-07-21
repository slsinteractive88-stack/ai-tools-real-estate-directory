import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'slsinteractive88-stack/ai-tools-real-estate-directory';

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

async function createGitHubIssue(data: ContactFormData): Promise<{ number: number; url: string }> {
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

  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
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

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const data: ContactFormData = await request.json();
    const errors = validateFormData(data);

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join(', ') },
        { status: 400 }
      );
    }

    const issue = await createGitHubIssue(data);

    return NextResponse.json({
      success: true,
      issueNumber: issue.number,
      issueUrl: issue.url,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit. Please try again later.' },
      { status: 500 }
    );
  }
}