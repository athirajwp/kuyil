import React, { useState } from 'react';
import { BarChart2, Search, Settings, UserPlus, Camera, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';

const InstagramIcon = ({ size = 22, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const ProfileView = () => {
  const { user, posts, userReplies, setActiveTab, setIsEditProfileOpen, selectedUserProfile, setSelectedUserProfile, followedUsers, toggleFollow } = useApp();
  const [profileTab, setProfileTab] = useState('vibes');

  const displayUser = selectedUserProfile || user;
  const isOwnProfile = !selectedUserProfile || selectedUserProfile.username === user.username;
  const isFollowed = followedUsers.includes(displayUser.username);

  const userPosts = posts.filter(p => p.author.username === displayUser.username);

  const handleBackToFeed = () => {
    setSelectedUserProfile(null);
    setActiveTab('home');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top Profile Header Bar */}
      <div style={{ padding: '16px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!isOwnProfile ? (
          <button 
            onClick={handleBackToFeed}
            style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent-blue)', padding: '4px', cursor: 'pointer' }}
          >
            ← Back to feed
          </button>
        ) : (
          <button style={{ color: 'var(--text-primary)', padding: '4px' }}>
            <BarChart2 size={24} />
          </button>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ color: 'var(--text-primary)', padding: '4px' }}><Search size={22} /></button>
          <button style={{ color: 'var(--text-primary)', padding: '4px' }}><InstagramIcon size={22} /></button>
          {isOwnProfile && (
            <button onClick={() => setActiveTab('settings')} style={{ color: 'var(--text-primary)', padding: '4px' }} title="Settings">
              <Settings size={22} />
            </button>
          )}
        </div>
      </div>

      {/* User Info Header Section */}
      <div style={{ padding: '0 16px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            {displayUser.name}
          </h1>
          <span style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '500' }}>
            @{displayUser.username}
          </span>

          {displayUser.bio && (
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {displayUser.bio}
            </p>
          )}

          {isOwnProfile && (
            <div style={{ marginTop: '8px' }}>
              <button className="pill" style={{ fontSize: '13px', padding: '4px 12px' }}>
                ✦ + Add interests ✦
              </button>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <div style={{ display: 'flex', marginLeft: '4px' }}>
              {(displayUser.followers || []).map((f, i) => (
                <img 
                  key={i} 
                  src={f.avatar} 
                  alt={f.name}
                  style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--bg-primary)', marginLeft: i > 0 ? '-6px' : 0 }}
                />
              ))}
            </div>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {displayUser.followersCount} followers
            </span>
          </div>
        </div>

        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <img 
            src={displayUser.avatar} 
            alt={displayUser.name} 
            style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover' }}
          />
          {isOwnProfile && (
            <div 
              style={{
                position: 'absolute',
                bottom: '0px',
                left: '-8px',
                backgroundColor: 'var(--bg-primary)',
                border: '1.5px dashed var(--text-secondary)',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              +
            </div>
          )}
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
                borderRadius: '10px',
                border: '1px solid var(--border-dark)',
                fontSize: '15px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              Edit profile
            </button>
            <button 
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: '10px',
                border: '1px solid var(--border-dark)',
                fontSize: '15px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-primary)'
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

      {/* Profile Navigation Tabs matching Screenshot 7 */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        {['vibes', 'replies', 'media', 'reposts'].map(tab => (
          <button
            key={tab}
            onClick={() => setProfileTab(tab)}
            style={{
              flex: 1,
              padding: '12px 0',
              fontSize: '15px',
              fontWeight: '600',
              color: profileTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: profileTab === tab ? '2px solid var(--text-primary)' : 'none',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'vibes' ? 'Threads' : tab}
          </button>
        ))}
      </div>

      {/* Content depending on Profile Tab */}
      {profileTab === 'vibes' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Finish your profile Carousel matching Screenshots 7 & 8 */}
          <div style={{ padding: '16px 16px 8px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Finish your profile</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>4 left</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }}>
              {/* Card 1 */}
              <div style={{
                minWidth: '220px',
                padding: '20px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={22} color="var(--text-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Follow 10 profiles</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Fill your feed with threads that interest you.</div>
                </div>
                <button style={{ width: '100%', padding: '10px 0', borderRadius: '10px', backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)', fontWeight: '700', fontSize: '14px', marginTop: 'auto' }}>
                  See profiles
                </button>
              </div>

              {/* Card 2 */}
              <div style={{
                minWidth: '220px',
                padding: '20px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={22} color="var(--text-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Add profile photo</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Make it easier for people to recognize you.</div>
                </div>
                <button onClick={() => setIsEditProfileOpen(true)} style={{ width: '100%', padding: '10px 0', borderRadius: '10px', backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)', fontWeight: '700', fontSize: '14px', marginTop: 'auto' }}>
                  Add
                </button>
              </div>

              {/* Card 3 */}
              <div style={{
                minWidth: '220px',
                padding: '20px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Edit3 size={22} color="var(--text-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Add bio</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Introduce yourself and tell people what you're into.</div>
                </div>
                <button onClick={() => setIsEditProfileOpen(true)} style={{ width: '100%', padding: '10px 0', borderRadius: '10px', backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)', fontWeight: '700', fontSize: '14px', marginTop: 'auto' }}>
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* User Posts List & "Post not available" blocks matching Screenshot 7 */}
          {userPosts.map(p => <PostCard key={p.id} post={p} />)}

          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>
              Post not available
            </div>
            <div style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>
              Post not available
            </div>
          </div>
        </div>
      )}

      {profileTab === 'replies' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Threaded Replies matching Screenshot 12 */}
          {userReplies.map(reply => (
            <div key={reply.id} style={{ borderBottom: '1px solid var(--border-color)', padding: '16px' }}>
              {/* Parent post block */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={reply.parentPost.author.avatar} alt="Avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div className="thread-line" style={{ marginTop: '6px', minHeight: '30px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{reply.parentPost.author.username}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{reply.parentPost.date}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0' }}>Reply to unavailable post</div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{reply.parentPost.content}</div>
                </div>
              </div>

              {/* User Reply block */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', paddingLeft: '8px' }}>
                <img src={reply.userReply.author.avatar} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{reply.userReply.author.username}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{reply.userReply.date}</span>
                  </div>
                  <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginTop: '2px' }}>{reply.userReply.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {profileTab === 'media' && (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '15px', fontWeight: '500' }}>No media uploaded yet.</p>
        </div>
      )}

      {profileTab === 'reposts' && (
        /* Matching Screenshot 15 */
        <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '15px', fontWeight: '500' }}>You haven't reposted any threads yet.</p>
        </div>
      )}
    </div>
  );
};
