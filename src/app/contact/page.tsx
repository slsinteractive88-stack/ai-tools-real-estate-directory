import { Metadata } from 'next';
import { ContactForm } from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Realty AI Vault - submit a tool, request a listing update, or get in touch with our team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question? Want to submit a tool for the directory? Need to update or remove a listing?
            Use the form below and we&apos;ll get back to you within 1-2 business days.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <ContactForm />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-semibold text-gray-900 mb-1">General Inquiries</h3>
            <p className="text-gray-600 text-sm">Questions about the directory, partnerships, or advertising</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🛠️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Tool Submissions</h3>
            <p className="text-gray-600 text-sm">Submit your AI tool for inclusion in the directory</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-1">Privacy & Data</h3>
            <p className="text-gray-600 text-sm">GDPR requests, data deletion, or privacy questions</p>
          </div>
        </div>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-medium text-gray-900 mb-2">What happens after you submit?</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Your message creates a GitHub issue in our private tracker</li>
            <li>Our team reviews and responds within 1-2 business days</li>
            <li>You&apos;ll receive a reply directly to your email</li>
            <li>All communications are tracked for accountability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}