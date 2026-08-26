import React, { useState } from 'react';
import { 
  Settings, 
  Camera, 
  Users, 
  UserCheck, 
  Heart, 
  Edit3, 
  Share2, 
  Sparkles, 
  Music, 
  Radio, 
  Bookmark, 
  Play, 
  MessageSquare, 
  Grid, 
  Flame, 
  ShieldCheck, 
  CheckCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';
import { UserListModal } from '../components/UserListModal';

export const ProfileView = () => {
  const { 
    user, 
    posts, 
    userReplies, 
    setActiveTab, 
    setIsEditProfileOpen, 
    selectedUserProfile, 
    setSelectedUserProfile, 
    followedUsers, 
    toggleFollow, 
    setIsComposeOpen 
  } = useApp();

  const [profileTab, setProfileTab] = useState('posts');
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [userListTab, setUserListTab] = useState('followers');
  const [playingClipId, setPlayingClipId] = useState(null);
  const [shareToast, setShareToast] = useState(false);

  const displayUser = selectedUserProfile || user;
  const isOwnProfile = !selectedUserProfile || selectedUserProfile.username === user.username;
  const isFollowed = followedUsers.includes(displayUser.username);

  // User Posts or showcase posts
  const userPosts = posts.filter(p => p.author.username === displayUser.username);

  const handleBackToFeed = () => {
    setSelectedUserProfile(null);
    setActiveTab('messages');
  };

  const openUserListModal = (tabType) => {
    setUserListTab(tabType);
    setIsUserListOpen(true);
  };

  const handleShareProfile = () => {
    const profileUrl = `https://kuyil.app/@${displayUser.username}`;
    navigator.clipboard?.writeText(profileUrl);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '100%', maxWidth: '680px', margin: '0 auto' }}>
      
      {/* Share Toast Alert */}
      {shareToast && (
        <div style={{
          margin: '12px 16px 0 16px',
          padding: '10px 16px',
          backgroundColor: '#22c55e',
          color: '#ffffff',
          borderRadius: '16px',
          fontSize: '13px',
          fontWeight: '700',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          ✓ Profile link copied to clipboard!
        </div>
      )}

      {/* User Info Header Section: Exactly aligned like screenshot */}
      <div style={{ padding: '16px 20px 14px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Top Header Row: [Avatar] [Name & Username] [Settings Gear] */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
          
          {/* Avatar on Far Left */}
          <div 
            onClick={() => isOwnProfile && setIsEditProfileOpen(true)}
            style={{ position: 'relative', cursor: isOwnProfile ? 'pointer' : 'default', flexShrink: 0 }}
            title={isOwnProfile ? "Click to change profile picture" : ""}
          >
            <img 
              src={displayUser.avatar} 
              alt={displayUser.name} 
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            {isOwnProfile && (
              <div 
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '0px',
                  backgroundColor: 'var(--accent-blue)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700',
                  boxShadow: 'var(--shadow-sm)',
                  border: '2px solid var(--bg-primary)'
                }}
              >
                <Camera size={11} />
              </div>
            )}
          </div>

          {/* Middle Column: Name & Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
            {!isOwnProfile && (
              <button 
                onClick={handleBackToFeed}
                style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent-blue)', padding: '0', marginBottom: '2px', cursor: 'pointer', border: 'none', background: 'none', textAlign: 'left' }}
              >
                ← Back to feed
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px', margin: 0 }}>
                {displayUser.name}
              </h1>
              <ShieldCheck size={18} color="var(--accent-blue)" title="Verified Kuyil Creator" />
            </div>

            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
              @{displayUser.username}
            </span>
          </div>

          {/* Far Right: Settings Gear Circle Button */}
          {isOwnProfile && (
            <button 
              onClick={() => setActiveTab('settings')} 
              style={{
                color: 'var(--text-primary)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }} 
              title="Settings"
            >
              <Settings size={20} />
            </button>
          )}
        </div>

        {/* Second Row: Bio */}
        {displayUser.bio && (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0', lineHeight: '1.45', fontWeight: '500' }}>
            {displayUser.bio}
          </p>
        )}

        {/* Third Row: Vibe Status Mood Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '700',
          color: 'var(--accent-blue)',
          width: 'fit-content'
        }}>
          <Sparkles size={14} color="var(--accent-blue)" />
          <span>{displayUser.statusNote || 'Vibe Coding & Music 🎵'}</span>
        </div>

      </div>

      {/* 3. Stats Micro-Cards (Friends, Followers, Following) */}
      <div style={{ padding: '0 20px 16px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          backgroundColor: 'var(--bg-secondary)',
          padding: '12px',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => openUserListModal('friends')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '8px 4px',
              borderRadius: '14px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Heart size={14} color="#ef4444" fill="#ef4444" />
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {displayUser.friendsCount || 8}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Friends
            </span>
          </button>

          <button
            onClick={() => openUserListModal('followers')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '8px 4px',
              borderRadius: '14px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={14} color="var(--accent-blue)" />
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {displayUser.followersCount || 16}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Followers
            </span>
          </button>

          <button
            onClick={() => openUserListModal('following')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '8px 4px',
              borderRadius: '14px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <UserCheck size={14} color="#22c55e" />
              <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {displayUser.followingCount || 12}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Following
            </span>
          </button>
        </div>
      </div>

      {/* 4. Action Buttons Bar */}
      <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '10px' }}>
        {isOwnProfile ? (
          <>
            <button 
              onClick={() => setIsEditProfileOpen(true)}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </button>

            <button 
              onClick={handleShareProfile}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Share2 size={15} />
              <span>Share Profile</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => toggleFollow(displayUser.username)}
            className="pill active"
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: '16px',
              backgroundColor: isFollowed ? 'var(--bg-secondary)' : 'var(--accent-blue)',
              color: isFollowed ? 'var(--text-primary)' : '#ffffff',
              border: isFollowed ? '1px solid var(--border-color)' : 'none',
              fontWeight: '800',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {isFollowed ? (
              <>
                <CheckCircle size={16} color="#22c55e" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Follow User</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* 5. Sleek Profile Navigation Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)'
      }}>
        {[
          { id: 'posts', label: 'Posts', count: userPosts.length },
          { id: 'voice', label: 'Voice Clips', count: 3 },
          { id: 'music', label: 'Music', count: 4 },
          { id: 'saved', label: 'Saved', count: 2 }
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
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '1px 6px',
                borderRadius: '10px',
                backgroundColor: profileTab === tab.id ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-secondary)',
                color: profileTab === tab.id ? 'var(--accent-blue)' : 'var(--text-muted)'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 6. Tab Contents */}
      
      {/* TAB 1: POSTS */}
      {profileTab === 'posts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          {userPosts.length > 0 ? (
            userPosts.map(p => <PostCard key={p.id} post={p} />)
          ) : (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                ✍️
              </div>

              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  No posts yet
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0 0', maxWidth: '300px' }}>
                  Share your music vibes, thoughts, or voice notes on Kuyil!
                </p>
              </div>

              {isOwnProfile && (
                <button
                  onClick={() => setIsComposeOpen(true)}
                  className="pill active"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    marginTop: '6px'
                  }}
                >
                  Create New Post
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VOICE CLIPS */}
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
          ].map(clip => {
            const isPlaying = playingClipId === clip.id;
            return (
              <div
                key={clip.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={displayUser.avatar} alt="User" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)' }}>{displayUser.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '6px', fontWeight: '600' }}>• {clip.date}</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    color: '#8b5cf6',
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    VOICE CLIP
                  </span>
                </div>

                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {clip.title}
                </div>

                {/* Audio Waveform Player Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: '16px' }}>
                  <button
                    onClick={() => setPlayingClipId(isPlaying ? null : clip.id)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-blue)',
                      color: '#fff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '3px', height: '28px' }}>
                    {clip.waveform.map((val, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: `${val}%`,
                          backgroundColor: isPlaying ? 'var(--accent-blue)' : 'var(--text-muted)',
                          borderRadius: '3px',
                          opacity: isPlaying ? (idx % 2 === 0 ? 1 : 0.6) : 0.4,
                          transition: 'height 0.2s ease, background-color 0.2s ease'
                        }}
                      />
                    ))}
                  </div>

                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)' }}>{clip.duration}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', paddingTop: '2px' }}>
                  <span>❤️ {clip.likes} likes</span>
                  <span>💬 {clip.replies} replies</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: MUSIC */}
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
                borderRadius: '18px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                <img src={track.cover} alt={track.title} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.artist}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>{track.duration}</span>
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

      {/* TAB 4: SAVED */}
      {profileTab === 'saved' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '2px' }}>
            Bookmarked Vibes & Saved Spaces (2)
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', fontWeight: '800', backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '3px 10px', borderRadius: '12px' }}>
                SAVED VOICE SPACE
              </span>
              <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700' }}>● 142 listening</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Late Night Tech & AI Vibes 🎙️
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
              Hosted by Tech Reader • Drop-in live group audio chats & discussions
            </div>
            <button
              onClick={() => setActiveTab('voice')}
              className="pill active"
              style={{ padding: '9px 0', fontSize: '13px', fontWeight: '800', textAlign: 'center', marginTop: '4px', cursor: 'pointer' }}
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
