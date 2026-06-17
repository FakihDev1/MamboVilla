import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatemweProperty from './components/MatemweProperty';
import MikumiProperty from './components/MikumiProperty';
import Reviews from './components/Reviews';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Scroll spy to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'matemwe', 'mikumi', 'reviews', 'inquire'];
      const scrollPosition = window.scrollY + 200; // Offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      {/* Navigation */}
      <Navbar onNavigate={handleScrollToSection} activeSection={activeSection} />

      {/* Hero split panel */}
      <main className="flex-grow">
        <Hero onSelectProperty={handleScrollToSection} />

        {/* Matemwe Beach Property Section */}
        <MatemweProperty onBookNow={() => handleScrollToSection('inquire')} />

        {/* Mikumi Safari Property Section */}
        <MikumiProperty onBookNow={() => handleScrollToSection('inquire')} />

        {/* TripAdvisor Reviews (Reputation management) */}
        <Reviews />

        {/* Inquiries / Custom Inquiry Form */}
        <InquiryForm />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleScrollToSection} />
    </div>
  );
}
