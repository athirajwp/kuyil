import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Repeat, AtSign, Headphones, CheckCheck, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'like',
    user: { name: 'Priyanka S', username: 'priyanka.s_p_', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    timeAgo: '12m',
    text: 'liked your vibe: "Building Vibespace with real-time audio rooms 🚀"',
    read: false
  },
  {
    id: 2,
    type: 'reply',
    user: { name: 'Tivss', username: 'heyitsme.tivss', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
    timeAgo: '45m',
    text: 'replied to your vibe: "This design looks super sleek and intuitive!"',
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: { name: 'Dhanniya', username: 'dhanniyaaa', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' },
    timeAgo: '2h',
    text: 'started following you',
    read: false
  },
  {
    id: 4,
    type: 'music',
    user: { name: 'Kavvii', username: 'kavvii_x', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    timeAgo: '4h',
    text: 'invited you to Listen Together room "Midnight Jazz Beats" 🎧',
    read: true,
    action: 'join_room'
  },
  {
    id: 5,
    type: 'repost',
    user: { name: 'Rossy', username: 'rossyerss', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', verified: true },
    timeAgo: '1d',
    text: 'reposted your vibe in Tech Vibes',
    read: true
  },
  {
    id: 6,
    type: 'mention',
    user: { name: 'Actress Reehana', username: 'actress_reehanaofficial', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', verified: true },
    timeAgo: '2d',
    text: 'mentioned you in a vibe: "@athiraj.kp check out this new synth track 🔥"',
    read: true
  },
  {
    id: 7,
    type: 'like',
    user: { name: 'Boleh Bromy', username: 'bolehbromy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    timeAgo: '3d',
    text: 'liked your reply in AI Vibes',
    read: true
  }
];

export const ActivityView = () => {
  const { followedUsers, toggleFollow, viewUserProfile, setActiveTab } = useApp();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markSingleAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredNotifications = notifications;

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'like':
        return <div style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><Heart size={10} fill="#fff" /></div>;
      case 'reply':
        return <div style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><MessageCircle size={10} fill="#fff" /></div>;
      case 'follow':
        return <div style={{ backgroundColor: '#8b5cf6', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><UserPlus size={10} /></div>;
      case 'repost':
        return <div style={{ backgroundColor: '#10b981', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><Repeat size={10} /></div>;
      case 'music':
        return <div style={{ backgroundColor: '#ec4899', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><Headphones size={10} /></div>;
      case 'mention':
        return <div style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><AtSign size={10} /></div>;
      default:
        return <div style={{ backgroundColor: '#6b7280', color: '#fff', padding: '4px', borderRadius: '50%', display: 'flex' }}><Bell size={10} /></div>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px', paddingBottom: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.8px', color: 'var(--text-primary)' }}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span style={{
              backgroundColor: 'var(--accent-color)',
              color: 'var(--accent-text)',
              fontSize: '12px',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--accent-blue)',
              cursor: 'pointer'
            }}
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      {/* Notifications Stream */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => {
            const isFollowing = notif.user ? followedUsers.includes(notif.user.username) : false;

            return (
              <div 
                key={notif.id}
                onClick={() => markSingleAsRead(notif.id)}
                style={{
                  padding: '16px',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'background-color 0.2s ease',
                  position: 'relative'
                }}
              >
                {!notif.read && (
                  <div style={{
                    position: 'absolute',
                    left: '6px',
                    top: '24px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-blue)'
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                  {/* User Avatar with Type Badge */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      viewUserProfile(notif.user);
                    }}
                    style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                  >
                    <img 
                      src={notif.user.avatar} 
                      alt={notif.user.name} 
                      style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: '-2px', right: '-2px' }}>
                      {getBadgeIcon(notif.type)}
                    </div>
                  </div>

                  {/* Notification Content */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ fontSize: '14px', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          viewUserProfile(notif.user);
                        }}
                        style={{ fontWeight: '700', cursor: 'pointer', marginRight: '6px' }}
                      >
                        {notif.user.username}
                        {notif.user.verified && <span style={{ color: 'var(--accent-blue)', marginLeft: '3px' }}>✓</span>}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{notif.text}</span>
                    </div>

                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
                      {notif.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Quick Action Button if applicable */}
                {notif.type === 'follow' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(notif.user.username);
                    }}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '10px',
                      backgroundColor: isFollowing ? 'var(--bg-secondary)' : 'var(--accent-color)',
                      color: isFollowing ? 'var(--text-primary)' : 'var(--accent-text)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: isFollowing ? '1px solid var(--border-dark)' : 'none',
                      flexShrink: 0,
                      alignSelf: 'center'
                    }}
                  >
                    {isFollowing ? 'Following' : 'Follow back'}
                  </button>
                )}

                {notif.type === 'music' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('listen');
                    }}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--accent-color)',
                      color: 'var(--accent-text)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: 'none',
                      flexShrink: 0,
                      alignSelf: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Headphones size={14} /> Join
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Bell size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ fontSize: '15px', fontWeight: '600' }}>No notifications here yet</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              When people interact with your vibes, you'll see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

