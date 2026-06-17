import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Compass, Sun, Ship } from 'lucide-react';

export default function Navbar({ onNavigate, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Matemwe Beach Villa', id: 'matemwe' },
    { name: 'Mikumi Safari Lodge', id: 'mikumi' },
    { name: 'TripAdvisor Reviews', id: 'reviews' },
    { name: 'Inquire Now', id: 'inquire' }
  ];

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200/30 shadow-md py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="container flex items-center justify-between">
        {/* Logo and brand name */}
        <button 
          onClick={() => handleLinkClick('home')} 
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <img 
            src="/images/logo.jpg" 
            alt="Mambo Villa Logo" 
            className="w-12 h-12 rounded-full object-cover border border-stone-200 shadow-sm"
          />
          <div>
            <span className="font-display font-bold text-lg leading-none tracking-tight block text-stone-800">
              MAMBO VILLA
            </span>
            <span className="text-xs uppercase tracking-wider text-teal-600 font-semibold block">
              Zanzibar & Mikumi
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`font-display font-medium text-sm tracking-wide transition-colors duration-200 hover:text-teal-600 focus:outline-none ${
                activeSection === link.id 
                  ? 'text-teal-600 border-b-2 border-teal-600 pb-1' 
                  : 'text-stone-700'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* CTA Phone Call */}
        <div className="hidden lg:flex items-center gap-2 text-stone-700 bg-stone-100 py-2 px-4 rounded-full border border-stone-200/50 shadow-sm">
          <Phone className="w-4 h-4 text-teal-600" />
          <a href="tel:+255748401847" className="font-mono text-xs font-semibold hover:text-teal-600 transition-colors">
            +255 748 401 847
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-stone-800 p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-white/95 backdrop-blur-md z-40 border-t border-stone-200 flex flex-col justify-between py-8 px-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-display text-2xl font-semibold text-left transition-colors duration-200 focus:outline-none ${
                  activeSection === link.id ? 'text-teal-600' : 'text-stone-800'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile footer links */}
          <div className="border-t border-stone-200 pt-6 flex flex-col gap-4">
            <a 
              href="tel:+255748401847"
              className="flex items-center gap-3 text-stone-700 font-medium"
            >
              <Phone className="w-5 h-5 text-teal-600" />
              <span className="font-mono text-sm">+255 748 401 847</span>
            </a>
            <p className="text-xs text-stone-500">
              © {new Date().getFullYear()} Mambo Group. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
