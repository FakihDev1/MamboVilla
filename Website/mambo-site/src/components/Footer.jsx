"use client";

import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Waves, Trees } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handlePropertyClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 pt-16 pb-12 border-t border-stone-800 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand & Logo */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handlePropertyClick('home')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none w-fit"
          >
            <img 
              src="/images/Mambo Hotel Group logo.png" 
              alt="Mambo Hotel Group Logo" 
              className="w-8 h-8 object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-bold text-white text-lg tracking-tight group-hover:text-stone-200 transition-colors">
              Mambo Hotel Group
            </span>
          </button>
          <p className="text-stone-400 font-light text-xs leading-relaxed max-w-xs">
            A boutique hospitality group managing Mambo Beach Hotel on the Matemwe coast in Zanzibar, and the upcoming Mambo Hills Safari Lodge in Mikumi, Tanzania.
          </p>
        </div>

        {/* Column 2: Properties Direct Links */}
        <div>
          <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Our Boutique Properties
          </h3>
          <ul className="flex flex-col gap-3 text-xs">
            <li>
              <button 
                onClick={() => handlePropertyClick('mambo-beach')}
                className="hover:text-ocean-400 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <Waves className="w-3.5 h-3.5 text-ocean-600" />
                <span>Mambo Beach Hotel – Zanzibar</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePropertyClick('mambo-safari')}
                className="hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <Trees className="w-3.5 h-3.5 text-amber-600" />
                <span>Mambo Hills Safari Lodge – Mikumi</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Details */}
        <div>
          <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Reservations Office
          </h3>
          <ul className="flex flex-col gap-3 text-xs font-light">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <span>Matemwe Beach, North Coast, Zanzibar / Mikumi, Tanzania</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-stone-500" />
              <a href="mailto:admin@mambohotelgroup.com" className="hover:text-white transition-colors">
                admin@mambohotelgroup.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-stone-500" />
              <span>+447849243128</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Compliance & Security */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider">
            Trust & Security
          </h3>
          <div className="flex flex-col gap-2.5 text-xs text-stone-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cloudflare Turnstile Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>SSL Secure Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Underbar Copyright */}
      <div className="border-t border-stone-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-light">
        <p>&copy; {new Date().getFullYear()} Mambo Hotel Group. All rights reserved.</p>
        <p className="flex gap-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <span>&bull;</span>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
