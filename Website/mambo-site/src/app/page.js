"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeLanding from '../components/HomeLanding';
import MamboBeachHotel from '../components/MamboBeachHotel';
import MamboHillsSafari from '../components/MamboHillsSafari';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeLanding setActiveTab={setActiveTab} />;
      case 'mambo-beach':
        return <MamboBeachHotel />;
      case 'mambo-safari':
        return <MamboHillsSafari />;
      default:
        return <HomeLanding setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sticky Tab Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <button 
              onClick={() => setActiveTab('home')}
              className={`py-4 font-semibold text-sm transition-colors relative cursor-pointer ${
                activeTab === 'home' ? 'text-ocean-700' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Home
              {activeTab === 'home' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ocean-600 rounded-t-full"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('mambo-beach')}
              className={`py-4 font-semibold text-sm transition-colors relative cursor-pointer ${
                activeTab === 'mambo-beach' ? 'text-ocean-700' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Mambo Beach Hotel
              {activeTab === 'mambo-beach' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ocean-600 rounded-t-full"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('mambo-safari')}
              className={`py-4 font-semibold text-sm transition-colors relative cursor-pointer ${
                activeTab === 'mambo-safari' ? 'text-ocean-700' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Mambo Hills Safari Lodge
              {activeTab === 'mambo-safari' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ocean-600 rounded-t-full"></div>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Active Tab Content */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
