import React from 'react';
import { Phone, Mail, MapPin, Compass } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.jpg" 
              alt="Mambo Villa Logo" 
              className="w-10 h-10 rounded-full object-cover border border-stone-800"
            />
            <span className="font-display font-bold text-lg text-white tracking-tight">
              MAMBO VILLA
            </span>
          </div>
          <p className="text-stone-400 text-xs font-light leading-relaxed">
            Experience the best of Tanzania. Stay at our luxury beach bungalows in Matemwe, Zanzibar, or embark on a wild savannah adventure at our safari lodge in Mikumi.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
            Destinations
          </h4>
          <div className="flex flex-col gap-3 text-xs">
            <button 
              onClick={() => onNavigate('matemwe')}
              className="text-left hover:text-white transition-colors focus:outline-none"
            >
              Mambo Beach Villa (Matemwe)
            </button>
            <button 
              onClick={() => onNavigate('mikumi')}
              className="text-left hover:text-white transition-colors focus:outline-none"
            >
              Mambo Hills Safari Lodge (Mikumi)
            </button>
            <button 
              onClick={() => onNavigate('reviews')}
              className="text-left hover:text-white transition-colors focus:outline-none"
            >
              Guest Reviews
            </button>
            <button 
              onClick={() => onNavigate('inquire')}
              className="text-left hover:text-white transition-colors focus:outline-none"
            >
              Inquire / Contact
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
            Get in Touch
          </h4>
          <div className="flex flex-col gap-3 text-xs">
            <a href="tel:+255748401847" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-teal-500" />
              <span className="font-mono">+255 748 401 847</span>
            </a>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-teal-500" />
              <span className="font-mono">info@mambovillas.com</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-teal-500" />
              <span>Matemwe Beach, Zanzibar, TZ</span>
            </span>
          </div>
        </div>

        {/* Official Channels */}
        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">
            Connect With Us
          </h4>
          <p className="text-stone-400 text-xs font-light mb-4 leading-relaxed">
            Follow our properties, check updates, and view official listings on booking platforms:
          </p>
          <div className="flex gap-3">
            <a 
              href="https://www.facebook.com/p/Mambo-villa-61570228978096/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-full transition-colors border border-stone-700 flex items-center justify-center"
              aria-label="Facebook Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a 
              href="https://www.tripadvisor.co.uk/Hotel_Review-g616017-d23831648-Reviews-Mambo_Beach_Villas-Matemwe_Zanzibar_Island_Zanzibar_Archipelago.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-full transition-colors border border-stone-700 flex items-center justify-center font-bold text-xs"
              aria-label="TripAdvisor Listing"
            >
              TA
            </a>
          </div>
        </div>

      </div>

      <div className="container mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4 text-center md:text-left">
        <p>© {new Date().getFullYear()} Mambo Group. All rights reserved.</p>
        <p className="font-light">Designed for Mambo Beach Villa Matemwe & Mambo Hills Safari Lodge Mikumi</p>
      </div>
    </footer>
  );
}
