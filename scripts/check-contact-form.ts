#!/usr/bin/env node

/**
 * Cron job: Check for new contact form issues and notify user
 * Runs every hour via GitHub Actions or system cron
 * Only notifies if there are NEW issues since last check
 */

const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'slsinteractive88-stack/ai-tools-real-estate-directory';
const STATE_FILE = path.join(__dirname, 'contact-form-state.json');
const NOTIFY_WEBHOOK = process.env.NOTIFY_WEBHOOK; // Optional: webhook URL for notifications

interface Issue {
  number: number;
  title: string;
  created_at: string;
  html_url: string;
  labels: { name: string }[];
  body: string;
}

interface State {
  lastChecked: string;
  knownIssueNumbers: number[];
}

async function fetchContactIssues(): Promise<Issue[]> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/issues?labels=contact-form&state=open&sort=created&direction=desc&per_page=50`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

function loadState(): State {
  if (fs.existsSync(STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    } catch {
      return { lastChecked: new Date().toISOString(), knownIssueNumbers: [] };
    }
  }
  return { lastChecked: new Date().toISOString(), knownIssueNumbers: [] };
}

function saveState(state: State): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function formatIssueForNotification(issue: Issue): string {
  // Extract email from issue body
  const emailMatch = issue.body.match(/\*\*Email:\*\*\s*(.+)/);
  const email = emailMatch ? emailMatch[1].trim() : 'N/A';

  // Extract message preview
  const messageMatch = issue.body.split('### Message')[1]?.trim();
  const preview = messageMatch ? messageMatch.slice(0, 200) + '...' : 'N/A';

  return [
    `📨 **New Contact Form: #${issue.number}**`,
    `**Title:** ${issue.title}`,
    `**Email:** ${email}`,
    `**Submitted:** ${new Date(issue.created_at).toLocaleString()}`,
    `**Preview:** ${preview}`,
    `**Link:** ${issue.html_url}`,
    '',
  ].join('\n');
}

async function notify(webhookUrl: string, message: string): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
  } catch (error) {
    console.error('Notification failed:', error);
  }
}

async function main() {
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN not set');
    process.exit(1);
  }

  const state = loadState();
  const issues = await fetchContactIssues();
  const knownIssues = new Set(state.knownIssueNumbers);
  const newIssues = issues.filter(issue => !knownIssues.has(issue.number));

  if (newIssues.length === 0) {
    console.log('No new contact form submissions.');
    // Update last checked time
    state.lastChecked = new Date().toISOString();
    saveState(state);
    return;
  }

  console.log(`Found ${newIssues.length} new contact form submission(s)`);

  const message = [
    `📬 **${newIssues.length} new contact form submission(s)**`,
    '',
    ...newIssues.reverse().map(formatIssueForNotification),
    '---',
    '*Reply in the GitHub issue with `@bot reply Your response` to email the submitter.*',
  ].join('\n');

  // Output for cron job logging
  console.log(message);

  // Send notification if webhook configured
  if (NOTIFY_WEBHOOK) {
    await notify(NOTIFY_WEBHOOK, message);
  }

  // Update state with all current issue numbers
  state.knownIssueNumbers = issues.map(i => i.number);
  state.lastChecked = new Date().toISOString();
  saveState(state);
}

main().catch(console.error);