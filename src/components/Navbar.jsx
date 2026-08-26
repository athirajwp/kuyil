import React from 'react';
import { Menu, Search, ArrowLeft, Headphones, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VibespaceLogo } from './VibespaceLogo';

export const Navbar = () => {
  const { activeTab, setActiveTab, setIsDrawerOpen, selectedCommunity, setSelectedCommunity, triggerKuyilFlight, isFlying } = useApp();

  const isSubPage = ['settings', 'saved', 'liked'].includes(activeTab) || selectedCommunity !== null;

  const handleBack = () => {
    if (selectedCommunity) {
      setSelectedCommunity(null);
    } else {
      setActiveTab('messages');
    }
  };

  return (
    <header className="glass-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {isSubPage ? (
          <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', padding: '4px', cursor: 'pointer', border: 'none', background: 'none' }} title="Go Back">
            <ArrowLeft size={22} color="var(--text-primary)" />
          </button>
        ) : (
          <button 
            onClick={() => setIsDrawerOpen(true)}
            style={{ display: 'flex', alignItems: 'center', padding: '6px', border: 'none', background: 'none', cursor: 'pointer' }}
            title="Open Navigation Menu"
          >
            <Menu size={26} color="var(--text-primary)" strokeWidth={2.2} />
          </button>
        )}

        {/* Kuyil Logo & Title - Always Visible & Clean on All Pages */}
        <div 
          id="kuyil-logo-target"
          onClick={() => {
            setActiveTab('messages');
            setSelectedCommunity(null);
            triggerKuyilFlight();
          }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          title="Click to replay Kuyil bird flight!"
        >
          <VibespaceLogo size={40} className={isFlying ? 'kuyil-logo-flying-hidden' : 'kuyil-logo-landed'} />
          <span className={isFlying ? '' : 'kuyil-title-shine'} style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
            Kuyil
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <button 
          onClick={() => setActiveTab('listen')}
          title="Listen Together Room"
          style={{ display: 'flex', alignItems: 'center', padding: '6px', color: activeTab === 'listen' ? 'var(--accent-blue)' : 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <Headphones size={22} />
        </button>

        <button 
          onClick={() => setActiveTab('activity')} 
          title="Notifications & Activity"
          style={{ display: 'flex', alignItems: 'center', padding: '6px', color: activeTab === 'activity' ? 'var(--accent-blue)' : 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <Bell size={22} fill={activeTab === 'activity' ? "currentColor" : "none"} />
        </button>

        <button 
          onClick={() => setActiveTab('search')}
          style={{ display: 'flex', alignItems: 'center', padding: '6px', color: activeTab === 'search' ? 'var(--accent-blue)' : 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}
          title="Search People, Voice Spaces & Music"
        >
          <Search size={22} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
};

