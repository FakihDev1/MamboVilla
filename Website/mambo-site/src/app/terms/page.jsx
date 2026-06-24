"use client";

import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <Shield className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest font-bold">Legal Agreement</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-stone-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-stone-400 text-xs mt-2">Last updated: June 2026</p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-sm leading-relaxed font-light">
          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and booking a stay at any property managed by Mambo Hotel Group (including Mambo Beach Hotel in Matemwe, Zanzibar and Mambo Hills Safari Lodge in Mikumi), you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">2. Booking & Cancellation Policies</h2>
            <p>
              All reservations are subject to availability. To complete a direct booking inquiry, guest verification must be finalized. Cancellations and modifications are governed by the specific rates and OTA portals (e.g. Booking.com) selected during check-out.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">3. Extra Beds & Cots</h2>
            <p>
              Cots and extra beds are subject to availability and must be requested prior to arrival. Please contact the hotel administration directly at <strong>admin@mambohotelgroup.com</strong> or call <strong>+447849243128</strong> to make arrangements.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">4. Guest Conduct & Party Policy</h2>
            <p className="text-stone-900 font-medium">
              Important: To preserve a quiet and peaceful atmosphere for all guests, our properties will not accommodate hen, stag, or similar parties. Management reserves the right to terminate stays without refund if guest behavior disrupts the serenity of the properties.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-lg text-stone-900 mb-3">5. Private Host Management</h2>
            <p>
              All properties are operated and managed under private host administration in accordance with local hospitality licensing regulations in Tanzania.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
