"use client";

import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import InquiryModal from './InquiryModal';

export default function Header({ activeTab, setActiveTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b border-stone-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Brand: logo (enlarges on click) + text (navigates home) */}
          <div className="flex items-center gap-2.5">
            {/* Logo — click to enlarge */}
            <button
              onClick={() => setIsLogoOpen(true)}
              className="cursor-pointer focus:outline-none group"
              aria-label="View logo enlarged"
            >
              <img
                src="/images/Mambo Hotel Group logo.png"
                alt="Mambo Hotel Group Logo"
                className="w-10 h-10 object-contain rounded-xl shadow-md transition-all duration-300 group-hover:scale-110 group-active:scale-95"
              />
            </button>

            {/* Brand text — click to go home */}
            <button
              onClick={() => setActiveTab('home')}
              className="cursor-pointer text-left focus:outline-none group"
            >
              <span className="font-display font-bold text-stone-900 text-lg md:text-xl tracking-tight block leading-none group-hover:text-ocean-700 transition-colors">
                Mambo Hotel Group
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-widest uppercase block mt-1">
                Boutique Tanzania
              </span>
            </button>
          </div>

          {/* Global Action CTA Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Inquiry</span>
            </button>
          </div>
        </div>

        <InquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultProperty={
            activeTab === 'mambo-beach'
              ? 'Mambo Beach Hotel'
              : activeTab === 'mambo-safari'
              ? 'Mambo Hills Safari Lodge'
              : 'Mambo Hotel Group'
          }
        />
      </header>

      {/* Logo Lightbox Overlay */}
      {isLogoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-stone-950/80 backdrop-blur-md"
          onClick={() => setIsLogoOpen(false)}
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <div
            className="relative max-w-sm w-full bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-4"
            style={{ animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/Mambo Hotel Group logo.png"
              alt="Mambo Hotel Group Logo"
              className="w-full h-auto object-contain rounded-2xl"
            />
            <p className="text-stone-500 text-xs font-medium tracking-widest uppercase">
              Mambo Hotel Group
            </p>
            <button
              onClick={() => setIsLogoOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
    </>
  );
}
