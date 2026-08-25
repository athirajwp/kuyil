import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Home, 
  MessageSquare, 
  Headphones, 
  Radio, 
  Bell, 
  User, 
  Bookmark, 
  Heart, 
  Settings, 
  RefreshCw, 
  Zap, 
  Activity, 
  Database,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminView = () => {
  const { 
    pageVisibility, 
    togglePageVisibility, 
    posts, 
    theme, 
    toggleTheme, 
    triggerKuyilFlight,
    setActiveTab
  } = useApp();

  const pagesConfig = [
    { key: 'home', label: 'Home Feed', icon: Home, desc: 'Main social feed and posts stream' },
    { key: 'messages', label: 'Direct Messages', icon: MessageSquare, desc: '1-on-1 private messaging and chat' },
    { key: 'listen', label: 'Listen Together Room', icon: Headphones, desc: 'Synchronized music listening room' },
    { key: 'voice', label: 'Voice Spaces', icon: Radio, desc: 'Live drop-in group audio channels' },
    { key: 'activity', label: 'Notifications & Activity', icon: Bell, desc: 'User notifications, mentions & likes' },
    { key: 'profile', label: 'Profile View', icon: User, desc: 'User profile pages, tabs & bio' },
    { key: 'saved', label: 'Saved Vibes', icon: Bookmark, desc: 'Bookmarked posts and spaces' },
    { key: 'liked', label: 'Liked Vibes', icon: Heart, desc: 'Liked posts stream' },
    { key: 'settings', label: 'Settings', icon: Settings, desc: 'App preferences and theme toggles' },
  ];

  const handleResetAllVisible = () => {
    pagesConfig.forEach(p => {
      if (pageVisibility[p.key] === false) {
        togglePageVisibility(p.key);
      }
    });
  };

  const hiddenCount = pagesConfig.filter(p => pageVisibility[p.key] === false).length;

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Admin Header */}
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', padding: '10px', borderRadius: '14px', color: 'var(--accent-blue)' }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.4px' }}>
                Kuyil Developer Admin Panel
              </h1>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                Internal Engineering Access • System Controls
              </span>
            </div>
          </div>
          <span 
            className="pill" 
            style={{ 
              fontSize: '11px', 
              fontWeight: '800', 
              backgroundColor: hiddenCount > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)', 
              color: hiddenCount > 0 ? '#ef4444' : '#22c55e',
              border: 'none'
            }}
          >
            {hiddenCount > 0 ? `⚠️ ${hiddenCount} Page(s) Hidden` : '✓ All Pages Active'}
          </span>
        </div>
      </div>

      {/* Page View / Hide Controls Matrix */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--accent-blue)" />
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
              App Page Visibility Controls
            </h2>
          </div>
          {hiddenCount > 0 && (
            <button
              onClick={handleResetAllVisible}
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={12} />
              <span>Show All Pages</span>
            </button>
          )}
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '-4px 0 4px 0' }}>
          Toggle page visibility ON or OFF. Hidden pages will be removed from navigation bars and drawer menus instantly.
        </p>

        {/* List of Pages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pagesConfig.map((page) => {
            const Icon = page.icon;
            const isVisible = pageVisibility[page.key] !== false;

            return (
              <div
                key={page.key}
                style={{
                  backgroundColor: isVisible ? 'var(--bg-card)' : 'var(--bg-secondary)',
                  border: isVisible ? '1px solid var(--border-color)' : '1.5px dashed #ef4444',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  opacity: isVisible ? 1 : 0.75,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '12px', 
                      backgroundColor: isVisible ? 'var(--bg-secondary)' : 'rgba(239, 68, 68, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: isVisible ? 'var(--text-primary)' : '#ef4444',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {page.label}
                      </h3>
                      <span 
                        style={{ 
                          fontSize: '10px', 
                          fontWeight: '800', 
                          padding: '2px 8px', 
                          borderRadius: '8px', 
                          backgroundColor: isVisible ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.15)', 
                          color: isVisible ? '#22c55e' : '#ef4444' 
                        }}
                      >
                        {isVisible ? 'VISIBLE' : 'HIDDEN'}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {page.desc}
                    </p>
                  </div>
                </div>

                {/* View / Hide Toggle Button */}
                <button
                  onClick={() => togglePageVisibility(page.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '14px',
                    backgroundColor: isVisible ? 'rgba(239, 68, 68, 0.1)' : 'var(--accent-blue)',
                    color: isVisible ? '#ef4444' : '#ffffff',
                    fontWeight: '700',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isVisible ? (
                    <>
                      <EyeOff size={15} />
                      <span>Hide Page</span>
                    </>
                  ) : (
                    <>
                      <Eye size={15} />
                      <span>Show Page</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Developer System Telemetry & Quick Action Tools */}
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--accent-blue)" />
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
            System Telemetry & Developer Actions
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={18} color="var(--text-muted)" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Active Posts</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>{posts.length} Posts</div>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={18} color="#22c55e" />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Audio Engine</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#22c55e' }}>ONLINE</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
          <button
            onClick={triggerKuyilFlight}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            🕊️ Replay Bird Flight
          </button>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-blue)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Go to Home Feed
          </button>
        </div>
      </div>
    </div>
  );
};
