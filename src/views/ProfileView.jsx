import React, { useState } from 'react';
import { Settings, Camera, Users, UserCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { UserListModal } from '../components/UserListModal';

export const ProfileView = () => {
  const { user, posts, userReplies, setActiveTab, setIsEditProfileOpen, selectedUserProfile, setSelectedUserProfile, followedUsers, toggleFollow, setIsComposeOpen } = useApp();
  const [profileTab, setProfileTab] = useState('posts');

  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [userListTab, setUserListTab] = useState('followers');

  const displayUser = selectedUserProfile || user;
  const isOwnProfile = !selectedUserProfile || selectedUserProfile.username === user.username;
  const isFollowed = followedUsers.includes(displayUser.username);

  const userPosts = posts.filter(p => p.author.username === displayUser.username);

  const handleBackToFeed = () => {
    setSelectedUserProfile(null);
    setActiveTab('home');
  };

  const openUserListModal = (tabType) => {
    setUserListTab(tabType);
    setIsUserListOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top Profile Header Bar */}
      <div style={{ padding: '12px 16px 4px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!isOwnProfile ? (
          <button 
            onClick={handleBackToFeed}
            style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-blue)', padding: '4px', cursor: 'pointer' }}
          >
            ← Back to feed
          </button>
        ) : (
          <div />
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isOwnProfile && (
            <button onClick={() => setActiveTab('settings')} style={{ color: 'var(--text-primary)', padding: '4px', cursor: 'pointer' }} title="Settings">
              <Settings size={22} />
            </button>
          )}
        </div>
      </div>

      {/* User Info Header Section: Name, Username, Bio + Avatar */}
      <div style={{ padding: '0 16px 10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px', margin: 0 }}>
            {displayUser.name}
          </h1>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>
            @{displayUser.username}
          </span>

          {displayUser.bio && (
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', margin: '4px 0 0 0', lineHeight: '1.4' }}>
              {displayUser.bio}
            </p>
          )}
        </div>

        {/* Avatar */}
        <div 
          onClick={() => isOwnProfile && setIsEditProfileOpen(true)}
          style={{ position: 'relative', cursor: isOwnProfile ? 'pointer' : 'default', flexShrink: 0 }}
          title={isOwnProfile ? "Click to change profile picture" : ""}
        >
          <img 
            src={displayUser.avatar} 
            alt={displayUser.name} 
            style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover' }}
          />
          {isOwnProfile && (
            <div 
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                backgroundColor: 'var(--accent-blue)',
                color: '#ffffff',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Camera size={12} />
            </div>
          )}
        </div>
      </div>

      {/* Full-Width Aligned Network Stats Micro-Card Pill Row (Friends, Followers, Following) */}
      <div style={{ padding: '0 16px 14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {/* Friends Pill */}
          <button
            onClick={() => openUserListModal('friends')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            title="Click to view Friends"
          >
            <Heart size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {displayUser.friendsCount || 8}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>friends</span>
          </button>

          {/* Followers Pill */}
          <button
            onClick={() => openUserListModal('followers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            title="Click to view Followers"
          >
            <Users size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {displayUser.followersCount || 16}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>followers</span>
          </button>

          {/* Following Pill */}
          <button
            onClick={() => openUserListModal('following')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            title="Click to view Following"
          >
            <UserCheck size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {displayUser.followingCount || 12}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>following</span>
          </button>
        </div>
      </div>

      {/* Profile Action Buttons */}
      <div style={{ padding: '0 16px 16px 16px', display: 'flex', gap: '12px' }}>
        {isOwnProfile ? (
          <>
            <button 
              onClick={() => setIsEditProfileOpen(true)}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-xs)',
                cursor: 'pointer'
              }}
            >
              Edit profile
            </button>
            <button 
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-xs)',
                cursor: 'pointer'
              }}
            >
              Share profile
            </button>
          </>
        ) : (
          <button
            onClick={() => toggleFollow(displayUser.username)}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '12px',
              backgroundColor: isFollowed ? 'var(--bg-secondary)' : 'var(--accent-color)',
              color: isFollowed ? 'var(--text-primary)' : 'var(--accent-text)',
              border: isFollowed ? '1px solid var(--border-color)' : 'none',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer'
            }}
          >
            {isFollowed ? 'Following ✓' : '+ Follow User'}
          </button>
        )}
      </div>

      {/* Profile Navigation Tabs tailored to Kuyil App Features */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
        {[
          { id: 'posts', label: 'Posts' },
          { id: 'voice', label: 'Voice Clips' },
          { id: 'music', label: 'Music' },
          { id: 'saved', label: 'Saved' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setProfileTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: '700',
              color: profileTab === tab.id ? 'var(--accent-blue)' : 'var(--text-muted)',
              borderBottom: profileTab === tab.id ? '2.5px solid var(--accent-blue)' : '2.5px solid transparent',
              transition: 'all 0.15s ease',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content depending on Profile Tab */}
      {/* 1. Posts Tab */}
      {profileTab === 'posts' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {userPosts.length > 0 ? (
            userPosts.map(p => <PostCard key={p.id} post={p} />)
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>✍️</div>
              <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>No music posts yet</p>
              <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Share your music vibes, thoughts, or voice notes on Kuyil!</p>
              {isOwnProfile && (
                <button
                  onClick={() => setIsComposeOpen(true)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--accent-blue)',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Create New Post
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. Voice Clips Tab */}
      {profileTab === 'voice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          {[
            {
              id: 'vc-1',
              title: 'Tamil AI Voice & Music Models Discussion 🎙️',
              duration: '0:45',
              date: '2h ago',
              likes: 24,
              replies: 5,
              waveform: [40, 70, 30, 90, 60, 80, 50, 90, 40, 60, 80, 30]
            },
            {
              id: 'vc-2',
              title: 'Late Night Acoustic Guitar Jam & Kuyil Vibe 🎸',
              duration: '1:12',
              date: 'Yesterday',
              likes: 42,
              replies: 8,
              waveform: [60, 40, 80, 50, 90, 70, 40, 60, 30, 80, 50, 70]
            },
            {
              id: 'vc-3',
              title: 'Welcome to my Kuyil voice profile! 🕊️',
              duration: '0:28',
              date: '3 days ago',
              likes: 56,
              replies: 12,
              waveform: [30, 60, 90, 50, 80, 40, 70, 90, 60, 40, 80, 50]
            }
          ].map(clip => (
            <div
              key={clip.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={displayUser.avatar} alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{displayUser.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '6px' }}>• {clip.date}</span>
                  </div>
                </div>
                <span className="pill" style={{ fontSize: '10px', fontWeight: '800', backgroundColor: 'rgba(59,130,246,0.12)', color: 'var(--accent-blue)' }}>
                  VOICE CLIP
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                {clip.title}
              </div>

              {/* Audio Waveform Player Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '12px' }}>
                <button
                  onClick={() => alert(`Playing voice clip: ${clip.title}`)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-blue)',
                    color: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  ▶
                </button>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                  {clip.waveform.map((val, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        height: `${val}%`,
                        backgroundColor: 'var(--accent-blue)',
                        borderRadius: '2px',
                        opacity: idx < 4 ? 1 : 0.4
                      }}
                    />
                  ))}
                </div>

                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>{clip.duration}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', paddingTop: '4px' }}>
                <span>❤️ {clip.likes} likes</span>
                <span>💬 {clip.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Music Tab */}
      {profileTab === 'music' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '2px' }}>
            Favorite Tracks & Saved Playlist (4)
          </div>

          {[
            {
              id: 'tr-1',
              title: 'Nallaru Po | Dude',
              artist: 'Pradeep Ranganathan | Think Music',
              duration: '4:01',
              cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'
            },
            {
              id: 'tr-2',
              title: 'Aasa Kooda | Sai Abhyankkar',
              artist: 'Sai Abhyankkar | Think Music',
              duration: '3:32',
              cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300'
            },
            {
              id: 'tr-3',
              title: 'Neeye Neeye | Phani Kalyan',
              artist: 'Phani Kalyan | Think Music',
              duration: '4:28',
              cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300'
            },
            {
              id: 'tr-4',
              title: 'Vibe With Me (Kuyil Session)',
              artist: 'Athi Raj & Friends',
              duration: '3:15',
              cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300'
            }
          ].map(track => (
            <div
              key={track.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                <img src={track.cover} alt={track.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.artist}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{track.duration}</span>
                <button
                  onClick={() => alert(`Playing song: ${track.title}`)}
                  className="pill active"
                  style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  <span>▶ Play</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Saved Tab */}
      {profileTab === 'saved' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '2px' }}>
            Bookmarked Vibes & Saved Spaces
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="pill" style={{ fontSize: '10px', fontWeight: '800', backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
                SAVED VOICE SPACE
              </span>
              <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700' }}>● 142 listening</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Late Night Tech & AI Vibes 🎙️
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Hosted by Tech Reader • Drop-in live group audio chats & discussions
            </div>
            <button
              onClick={() => setActiveTab('voice')}
              className="pill active"
              style={{ padding: '8px 0', fontSize: '13px', fontWeight: '700', textAlign: 'center', marginTop: '4px', cursor: 'pointer' }}
            >
              Drop In Space
            </button>
          </div>
        </div>
      )}

      {/* Followers / Following / Friends List Modal */}
      <UserListModal
        isOpen={isUserListOpen}
        onClose={() => setIsUserListOpen(false)}
        initialTab={userListTab}
        targetUser={displayUser}
      />
    </div>
  );
};
