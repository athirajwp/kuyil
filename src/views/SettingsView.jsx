import React, { useState } from 'react';
import { User, UserPlus, Bell, Bookmark, Heart, Clock, Lock, Sliders, Shield, Share2, Settings as SettingsIcon, HelpCircle, Info, ChevronRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView = () => {
  const { setActiveTab } = useApp();
  const [subView, setSubView] = useState(null); // 'more_settings'

  if (subView === 'more_settings') {
    /* Matching Screenshot 14 */
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)' }}>
            More settings
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginTop: '12px' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Time management</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Media</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Accessibility</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Fediverse sharing</span>
              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>BETA</span>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Off</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Language</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Website permissions</div>
        </div>
      </div>
    );
  }

  /* Matching Screenshot 13 */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '16px' }}>
      {/* Accounts Center Card matching Screenshot 13 */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
            <User size={20} /> Accounts Center
          </div>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-blue)' }}>∞ Meta</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          Password, security, personal details, connected experiences, ad preferences
        </p>
      </div>

      {/* Settings Options List matching Screenshot 13 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '8px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <UserPlus size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Follow and invite friends</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Bell size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Notifications</span>
        </button>

        <button 
          onClick={() => setActiveTab('saved')}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}
        >
          <Bookmark size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Saved</span>
        </button>

        <button 
          onClick={() => setActiveTab('liked')}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}
        >
          <Heart size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Liked</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Clock size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Archive</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Lock size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Privacy</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Sliders size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Content preferences</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Shield size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Account status</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Share2 size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Sharing across profiles</span>
        </button>

        <button 
          onClick={() => setSubView('more_settings')}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}
        >
          <SettingsIcon size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>More settings</span>
          <ChevronRight size={18} color="var(--text-muted)" />
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <HelpCircle size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Help</span>
        </button>

        <button style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', width: '100%' }}>
          <Info size={22} color="var(--text-primary)" />
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>About</span>
        </button>
      </div>

      {/* Account Links */}
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-blue)', textAlign: 'left' }}>
          Switch accounts
        </button>
        <button style={{ fontSize: '16px', fontWeight: '600', color: '#ed4956', textAlign: 'left' }}>
          Log out
        </button>
      </div>
    </div>
  );
};
