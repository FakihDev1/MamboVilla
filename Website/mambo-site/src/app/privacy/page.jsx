import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-sand-50 py-16 px-6 lg:px-12 font-body text-stone-700">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-stone-200/60 shadow-sm">
        
        {/* Navigation back */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-semibold mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mambo Hotel Group</span>
        </Link>

        {/* Header */}
        <header className="border-b border-stone-100 pb-6 mb-8">
          <div className="flex items-center gap-2.5 mb-3 text-ocean-600">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest font-bold">Privacy Policy</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-stone-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-xs mt-2">Last updated: June 2026</p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-sm leading-relaxed font-light">
          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">1. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you make booking inquiries, register on our site, or otherwise contact us. This may include your name, email address, phone number, and booking details.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">2. How We Use Your Information</h2>
            <p>
              We use the collected information to process your booking inquiries, coordinate guest services, respond to your support requests, and send periodic updates or promotional information if requested.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell or lease your personal information to third parties. We may share information with trusted third-party partners (such as travel agencies or booking platform integrations) only to the extent necessary to fulfill your requests or process your stay.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">4. Cookies & Analytics</h2>
            <p>
              Our website may use cookies and standard web analytics tools to understand site usage and improve our design. You can modify your browser settings to refuse cookies, though some features of the site may function differently as a result.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">5. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact us at <strong>admin@mambohotelgroup.com</strong> or call <strong>+447849243128</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
