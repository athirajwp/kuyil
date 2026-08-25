import React from 'react';
import { Home, Send, Headphones, Radio, Bell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => setActiveTab('home')}
        title="Home Feed"
      >
        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 1.8} />
      </button>

      <button
        className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
        onClick={() => setActiveTab('messages')}
        title="Direct Messages"
      >
        <Send size={22} strokeWidth={activeTab === 'messages' ? 2.5 : 1.8} style={{ transform: 'rotate(-20deg)' }} />
      </button>

      <button
        className={`nav-item ${activeTab === 'listen' ? 'active' : ''}`}
        onClick={() => setActiveTab('listen')}
        title="Listen Together Music Room"
      >
        <Headphones size={24} strokeWidth={activeTab === 'listen' ? 2.5 : 1.8} />
      </button>

      <button
        className={`nav-item ${activeTab === 'voice' ? 'active' : ''}`}
        onClick={() => setActiveTab('voice')}
        title="Voice Spaces"
      >
        <Radio size={24} strokeWidth={activeTab === 'voice' ? 2.5 : 1.8} className={activeTab === 'voice' ? '' : 'animate-pulse'} />
      </button>

      <button
        className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
        onClick={() => setActiveTab('activity')}
        title="Notifications"
      >
        <Bell size={24} strokeWidth={activeTab === 'activity' ? 2.5 : 1.8} fill={activeTab === 'activity' ? "currentColor" : "none"} />
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
