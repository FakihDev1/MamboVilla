"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, X, Menu } from 'lucide-react';
import InquiryModal from './InquiryModal';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/mambo-beach', label: 'Mambo Beach Hotel' },
  { href: '/mambo-safari', label: 'Mambo Hills Safari Lodge' },
];

export default function Header() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const defaultProperty =
    pathname === '/mambo-beach'
      ? 'Mambo Beach Hotel'
      : pathname === '/mambo-safari'
      ? 'Mambo Hills Safari Lodge'
      : 'Mambo Hotel Group';

  return (
    <>
      <header className="w-full bg-white border-b border-stone-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Brand: logo (enlarges on click) + text (navigates home) */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Logo — click to enlarge */}
            <button
              onClick={() => setIsLogoOpen(true)}
              className="cursor-pointer focus:outline-none group"
              aria-label="View logo enlarged"
            >
              <Image
                src="/images/Mambo Hotel Group logo.png"
                alt="Mambo Hotel Group Logo"
                width={40}
                height={40}
                priority
                className="w-10 h-10 object-contain rounded-xl shadow-md transition-all duration-300 group-hover:scale-110 group-active:scale-95"
              />
            </button>

            {/* Brand text — click to go home */}
            <Link
              href="/"
              className="cursor-pointer text-left focus:outline-none group"
            >
              <span className="font-display font-bold text-stone-900 text-lg md:text-xl tracking-tight block leading-none group-hover:text-ocean-700 transition-colors">
                Mambo Hotel Group
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-widest uppercase block mt-1">
                Boutique Tanzania
              </span>
            </Link>
          </div>

          {/* Global Action CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile: compact icon button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="sm:hidden flex items-center justify-center w-11 h-11 bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow-sm transition-all cursor-pointer"
              aria-label="Open direct inquiry form"
            >
              <Mail className="w-4 h-4" />
            </button>
            {/* Desktop: full button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Inquiry</span>
            </button>
            {/* Mobile: hamburger menu toggle */}
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className="sm:hidden flex items-center justify-center w-11 h-11 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl transition-all cursor-pointer"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {isMenuOpen && (
          <nav
            id="mobile-nav"
            className="sm:hidden border-t border-stone-200 bg-white px-6 py-3"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block w-full text-left py-3 px-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'text-brand bg-brand/5'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <InquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultProperty={defaultProperty}
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
            <Image
              src="/images/Mambo Hotel Group logo.png"
              alt="Mambo Hotel Group Logo"
              width={1254}
              height={1254}
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
