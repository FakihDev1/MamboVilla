"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Home' },
  { href: '/mambo-beach', label: 'Mambo Beach Hotel' },
  { href: '/mambo-safari', label: 'Mambo Hills Safari Lodge' },
];

export default function TabsNav() {
  const pathname = usePathname();

  return (
    <div className="hidden sm:block sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <nav className="flex items-center gap-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
          {TABS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`py-4 font-semibold text-sm transition-colors relative cursor-pointer ${
                  isActive ? 'text-brand' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-t-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
