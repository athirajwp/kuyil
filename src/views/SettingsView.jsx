import React, { useState } from 'react';
import { 
  User, 
  Users,
  Bell, 
  Bookmark, 
  Heart, 
  Clock, 
  Lock, 
  Sliders, 
  Shield, 
  Share2, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Info, 
  ChevronRight, 
  ArrowLeft,
  Check,
  Copy,
  ToggleLeft,
  ToggleRight,
  Sun,
  Moon,
  Volume2,
  Sparkles,
  LogOut,
  UserCheck,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsView = () => {
  const { 
    user, 
    setActiveTab, 
    theme, 
    toggleTheme, 
    setIsEditProfileOpen,
    onlineUsers
  } = useApp();

  const [subView, setSubView] = useState(null); // 'notifications', 'privacy', 'content', 'account_status', 'sharing', 'archive', 'more_settings', 'help', 'about', 'switch_account'
  const [copiedToast, setCopiedToast] = useState(false);

  // Settings Toggles State
  const [notifPush, setNotifPush] = useState(true);
  const [notifDms, setNotifDms] = useState(true);
  const [notifVoice, setNotifVoice] = useState(true);

  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const [audioQuality, setAudioQuality] = useState('High (320kbps)');
  const [autoPlayMusic, setAutoPlayMusic] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [logoutMessage, setLogoutMessage] = useState(false);

  const handleCopyShareLink = () => {
    const profileUrl = `https://kuyil.app/@${user.username}`;
    navigator.clipboard?.writeText(profileUrl);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // SUBVIEW 1: NOTIFICATIONS
  if (subView === 'notifications') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Notification Preferences
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Push Notifications</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Receive alerts on device for key updates</p>
            </div>
            <button onClick={() => setNotifPush(!notifPush)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: notifPush ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
              {notifPush ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Direct Messages & Friend Alerts</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Notify when receiving new DMs or request accepts</p>
            </div>
            <button onClick={() => setNotifDms(!notifDms)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: notifDms ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
              {notifDms ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Live Voice Spaces & Music Invites</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Alerts when friends host live rooms</p>
            </div>
            <button onClick={() => setNotifVoice(!notifVoice)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: notifVoice ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
              {notifVoice ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUBVIEW 2: PRIVACY
  if (subView === 'privacy') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Privacy Settings
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Private Profile</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Only approved friends can view detailed profile info</p>
            </div>
            <button onClick={() => setIsPrivateAccount(!isPrivateAccount)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isPrivateAccount ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
              {isPrivateAccount ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Show Active Online Status</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Allow friends to see when you're online on Kuyil</p>
            </div>
            <button onClick={() => setShowOnlineStatus(!showOnlineStatus)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: showOnlineStatus ? '#22c55e' : 'var(--text-muted)' }}>
              {showOnlineStatus ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUBVIEW 3: CONTENT PREFERENCES
  if (subView === 'content') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Content & Audio Preferences
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
          {/* Theme Mode Toggle */}
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>App Appearance</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Current Mode: {theme.toUpperCase()}</p>
            </div>
            <button 
              onClick={toggleTheme}
              className="pill active"
              style={{ padding: '6px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Switch Dark' : 'Switch Light'}</span>
            </button>
          </div>

          {/* Audio Quality */}
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>YouTube Audio Quality</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Standard (128kbps)', 'High (320kbps)', 'Lossless HQ'].map(q => (
                <button
                  key={q}
                  onClick={() => setAudioQuality(q)}
                  className={`pill ${audioQuality === q ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-Play */}
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Auto-Play Next Music Track</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Continuously play related YouTube music streams</p>
            </div>
            <button onClick={() => setAutoPlayMusic(!autoPlayMusic)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: autoPlayMusic ? 'var(--accent-blue)' : 'var(--text-muted)' }}>
              {autoPlayMusic ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUBVIEW 4: ACCOUNT STATUS
  if (subView === 'account_status') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Account Standing & Status
          </h1>
        </div>

        <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Good Standing</h3>
              <p style={{ fontSize: '13px', color: '#22c55e', fontWeight: '700', margin: '2px 0 0 0' }}>No policy violations or restrictions</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Verified Creator Status</span>
            <span style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>Active ✅</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Member Since</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>August 2024</span>
          </div>
        </div>
      </div>
    );
  }

  // SUBVIEW 5: SHARING ACROSS PROFILES
  if (subView === 'sharing') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Share Your Profile
          </h1>
        </div>

        <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>{user.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>@{user.username}</p>
          </div>

          <div style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '14px',
            fontSize: '13px',
            color: 'var(--accent-blue)',
            fontWeight: '600',
            wordBreak: 'break-all'
          }}>
            https://kuyil.app/@{user.username}
          </div>

          <button
            onClick={handleCopyShareLink}
            className="pill active"
            style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {copiedToast ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedToast ? 'Profile Link Copied!' : 'Copy Profile Link'}</span>
          </button>
        </div>
      </div>
    );
  }

  // SUBVIEW 6: ARCHIVE
  if (subView === 'archive') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Audio & Session Archive
          </h1>
        </div>

        <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <Clock size={36} color="var(--accent-blue)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Listening & Audio History</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 0 0' }}>Your recent YouTube music streams & voice space participations are saved automatically.</p>
        </div>
      </div>
    );
  }

  // SUBVIEW 7: MORE SETTINGS
  if (subView === 'more_settings') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            More Settings
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>App Language</span>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '10px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontSize: '13px', fontWeight: '600' }}
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Time Spent Today</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-blue)' }}>42 minutes</span>
          </div>
        </div>
      </div>
    );
  }

  // SUBVIEW 8: HELP
  if (subView === 'help') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Help & Support Center
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>How does Listen Together work?</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>Search any song from YouTube Music, add it to your queue, and share synched playback with your friends!</p>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>How to find random friends online?</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>Go to Messages → Find Online Friends and click "Next 🎲" to instantly match with online creators!</p>
          </div>
        </div>
      </div>
    );
  }

  // SUBVIEW 9: ABOUT
  if (subView === 'about') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            About Kuyil App
          </h1>
        </div>

        <div style={{ padding: '24px', borderRadius: '20px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={40} color="var(--accent-blue)" />
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Kuyil App</h2>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue)', backgroundColor: 'var(--bg-secondary)', padding: '2px 10px', borderRadius: '10px' }}>Version 2.5.0</span>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 0 0', lineHeight: '1.4' }}>
            Next-gen social audio platform with synchronized YouTube music rooms, live voice spaces, and instant online friend matching.
          </p>
        </div>
      </div>
    );
  }

  // SUBVIEW 10: SWITCH ACCOUNT
  if (subView === 'switch_account') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSubView(null)} style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={22} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            Switch Accounts
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '14px 16px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', border: '2px solid var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>{user.name}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '1px 0 0 0' }}>@{user.username}</p>
              </div>
            </div>
            <Check size={18} color="var(--accent-blue)" />
          </div>
        </div>
      </div>
    );
  }

  // MAIN SETTINGS VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 16px 36px 16px', gap: '16px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
      
      {/* Native Kuyil User Account Card (Replaces Meta Accounts Center) */}
      <div 
        onClick={() => setIsEditProfileOpen(true)}
        style={{
          padding: '16px',
          borderRadius: '20px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--accent-blue)' }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </h3>
              <UserCheck size={16} color="var(--accent-blue)" />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '1px 0 0 0' }}>
              @{user.username} • Kuyil Account Settings
            </p>
          </div>
        </div>
        <button
          className="pill active"
          style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }}
        >
          Edit Profile
        </button>
      </div>

      {/* Settings Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
        
        {/* Find & Add Online Friends */}
        <button 
          onClick={() => setActiveTab('messages')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Users size={20} color="var(--accent-blue)" />
          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', flex: 1 }}>Find & Add Online Friends</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Notifications */}
        <button 
          onClick={() => setSubView('notifications')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Bell size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Notifications</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Saved */}
        <button 
          onClick={() => setActiveTab('saved')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Bookmark size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Saved Tracks & Posts</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Liked */}
        <button 
          onClick={() => setActiveTab('liked')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Heart size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Liked Content</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Archive */}
        <button 
          onClick={() => setSubView('archive')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Clock size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Audio Archive & Sessions</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Privacy */}
        <button 
          onClick={() => setSubView('privacy')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Lock size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Privacy</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Content Preferences */}
        <button 
          onClick={() => setSubView('content')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Sliders size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Content Preferences</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Account Status */}
        <button 
          onClick={() => setSubView('account_status')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Shield size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Account Status</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Sharing Across Profiles */}
        <button 
          onClick={() => setSubView('sharing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Share2 size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Share Profile Link</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* More Settings */}
        <button 
          onClick={() => setSubView('more_settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <SettingsIcon size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>More Settings</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* Help */}
        <button 
          onClick={() => setSubView('help')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <HelpCircle size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>Help & FAQ</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>

        {/* About */}
        <button 
          onClick={() => setSubView('about')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 14px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <Info size={20} color="var(--text-primary)" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', flex: 1 }}>About Kuyil App</span>
          <ChevronRight size={16} color="var(--text-muted)" />
        </button>
      </div>

      {/* Account Links */}
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={() => setSubView('switch_account')}
          style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-blue)', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          Switch accounts
        </button>
        <button 
          onClick={() => setLogoutMessage(true)}
          style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          Log out
        </button>
        {logoutMessage && (
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            (Logged out session demo. Reloading session...)
          </div>
        )}
      </div>

    </div>
  );
};

export default SettingsView;

