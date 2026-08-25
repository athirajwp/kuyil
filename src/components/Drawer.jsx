import React from 'react';
import { 
  X, 
  Home, 
  Headphones, 
  MessageSquare, 
  Search, 
  Bell, 
  User, 
  Users, 
  Bookmark, 
  Heart,
  Settings,
  Radio,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Drawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, setSelectedCommunity, setActiveTab, activeTab, setIsComposeOpen } = useApp();

  if (!isDrawerOpen) return null;

  const handleNavOther = (tab) => {
    setSelectedCommunity(null);
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const handleCreatePost = () => {
    setIsDrawerOpen(false);
    setIsComposeOpen(true);
  };

  const navItems = [
    { id: 'home', label: 'Home / Feed', icon: Home },
    { id: 'compose', label: 'Create New Post ✍️', icon: PlusCircle, action: handleCreatePost },
    { id: 'voice', label: 'Voice Spaces 🎙️', icon: Radio },
    { id: 'listen', label: 'Listen Together 🎧', icon: Headphones },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare },
    { id: 'activity', label: 'Notifications & Activity', icon: Bell },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'following', label: 'Following', icon: Users, target: 'home' },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'liked', label: 'Liked', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        display: 'flex'
      }}
    >
      {/* Backdrop */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Drawer content */}
      <div 
        style={{
          position: 'relative',
          width: '85%',
          maxWidth: '360px',
          height: '100%',
          backgroundColor: 'var(--bg-primary)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 101,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto',
          animation: 'slideInLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
            Navigation
          </h2>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            style={{ padding: '4px', borderRadius: '50%', color: 'var(--text-secondary)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* All Pages Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const targetTab = item.target || item.id;
            const isActive = activeTab === targetTab;

            return (
              <button 
                key={item.id}
                onClick={() => item.action ? item.action() : handleNavOther(targetTab)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '14px', 
                  padding: '12px 14px', 
                  width: '100%',
                  borderRadius: '14px',
                  backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                  border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                <Icon size={20} color="var(--text-primary)" />
                <span style={{ fontSize: '15px', fontWeight: isActive ? '700' : '600', color: 'var(--text-primary)' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
