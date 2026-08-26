import React from 'react';
import { Send, Radio, Search, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
        onClick={() => setActiveTab('messages')}
        title="Messages & Friends"
      >
        <Send size={22} strokeWidth={activeTab === 'messages' ? 2.5 : 1.8} style={{ transform: 'rotate(-20deg)' }} />
      </button>

      <button
        className={`nav-item ${activeTab === 'voice' ? 'active' : ''}`}
        onClick={() => setActiveTab('voice')}
        title="Voice Spaces"
      >
        <Radio size={24} strokeWidth={activeTab === 'voice' ? 2.5 : 1.8} className={activeTab === 'voice' ? '' : 'animate-pulse'} />
      </button>

      <button
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTab('search')}
        title="Search & Discover"
      >
        <Search size={22} strokeWidth={activeTab === 'search' ? 2.5 : 1.8} />
      </button>

      <button
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('profile')}
        title="Profile"
      >
        <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 1.8} />
      </button>
    </nav>
  );
};

export default BottomNav;

