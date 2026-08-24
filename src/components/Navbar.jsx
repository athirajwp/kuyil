import React from 'react';
import { Menu, Search, ArrowLeft, Sun, Moon, Headphones } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VibespaceLogo } from './VibespaceLogo';

export const Navbar = () => {
  const { activeTab, setActiveTab, setIsDrawerOpen, theme, toggleTheme, selectedCommunity, setSelectedCommunity, triggerKuyilFlight, isFlying } = useApp();

  const isSubPage = ['settings', 'saved', 'liked'].includes(activeTab) || selectedCommunity !== null;

  const handleBack = () => {
    if (selectedCommunity) {
      setSelectedCommunity(null);
    } else {
      setActiveTab('home');
    }
  };

  return (
    <header className="glass-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        {isSubPage ? (
          <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', padding: '4px', cursor: 'pointer' }} title="Go Back">
            <ArrowLeft size={22} color="var(--text-primary)" />
          </button>
        ) : (
          <button 
            onClick={() => setIsDrawerOpen(true)}
            style={{ display: 'flex', alignItems: 'center', padding: '6px' }}
            title="Open Navigation Menu"
          >
            <Menu size={26} color="var(--text-primary)" strokeWidth={2.2} />
          </button>
        )}

        {/* Kuyil Logo & Title - Always Visible & Clean on All Pages */}
        <div 
          id="kuyil-logo-target"
          onClick={() => {
            setActiveTab('home');
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
          style={{ display: 'flex', alignItems: 'center', padding: '6px', color: activeTab === 'listen' ? 'var(--accent-blue)' : 'var(--text-primary)' }}
        >
          <Headphones size={22} />
        </button>
        <button 
          onClick={toggleTheme} 
          title="Toggle Light/Dark Theme"
          style={{ display: 'flex', alignItems: 'center', padding: '6px', color: 'var(--text-secondary)' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button 
          onClick={() => setActiveTab('activity')}
          style={{ display: 'flex', alignItems: 'center', padding: '6px' }}
          title="Search"
        >
          <Search size={22} color="var(--text-primary)" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
};
