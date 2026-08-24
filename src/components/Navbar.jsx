import React from 'react';
import { Menu, Search, ArrowLeft, Sun, Moon, Headphones, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VibespaceLogo } from './VibespaceLogo';

export const Navbar = () => {
  const { activeTab, setActiveTab, setIsDrawerOpen, theme, toggleTheme, selectedCommunity, setSelectedCommunity } = useApp();

  const isSubPage = ['settings', 'saved', 'liked'].includes(activeTab) || selectedCommunity !== null;

  const handleBack = () => {
    if (selectedCommunity) {
      setSelectedCommunity(null);
    } else {
      setActiveTab('home');
    }
  };

  const getPageTitle = () => {
    if (selectedCommunity) return selectedCommunity.name;
    if (activeTab === 'settings') return 'Settings';
    if (activeTab === 'saved') return 'Saved';
    if (activeTab === 'liked') return 'Liked';
    if (activeTab === 'listen') return 'Listen Together';
    if (activeTab === 'voice') return 'Voice Spaces';
    return null;
  };

  const title = getPageTitle();

  return (
    <header className="glass-header">
      {isSubPage ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
            <ArrowLeft size={22} color="var(--text-primary)" />
          </button>
          <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
            {title}
          </span>
        </div>
      ) : (
        <button 
          onClick={() => setIsDrawerOpen(true)}
          style={{ display: 'flex', alignItems: 'center', padding: '6px' }}
          title="Open Navigation Menu"
        >
          <Menu size={26} color="var(--text-primary)" strokeWidth={2.2} />
        </button>
      )}

      {!title && (
        <div 
          onClick={() => { setActiveTab('home'); setSelectedCommunity(null); }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <VibespaceLogo size={44} />
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
            Kuyil
          </span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          onClick={() => setActiveTab('voice')}
          title="Voice Spaces (Clubhouse Live Chat)"
          style={{ display: 'flex', alignItems: 'center', padding: '6px', color: activeTab === 'voice' ? 'var(--accent-blue)' : 'var(--text-primary)' }}
        >
          <Radio size={22} className={activeTab === 'voice' ? '' : 'animate-pulse'} />
        </button>

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
