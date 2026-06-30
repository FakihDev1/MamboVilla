"use client";

import React from 'react';
import Link from 'next/link';

const VARIANTS = {
  primary: 'bg-brand hover:bg-brand-hover text-white',
  glass: 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white',
  glassStrong: 'bg-white/15 hover:bg-white/25 border border-white/40 text-white',
  onBrand: 'bg-white hover:bg-stone-100 text-brand',
  outline: 'bg-white hover:bg-stone-50 border border-stone-200 text-stone-900',
};

export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const isInternalLink = href && href.startsWith('/');
  const base =
    'font-bold transition-all inline-flex items-center justify-center gap-2 cursor-pointer';
  const classes = [base, VARIANTS[variant] ?? VARIANTS.primary, className].join(' ');

  if (isInternalLink) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props} type={props.type ?? 'button'}>
      {children}
    </button>
  );
}
