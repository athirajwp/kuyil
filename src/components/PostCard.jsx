import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Repeat, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Plus, 
  Check,
  Link,
  UserPlus,
  UserCheck,
  VolumeX,
  EyeOff,
  Flag
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PostCard = ({ post }) => {
  const { toggleLike, toggleSave, followedUsers, toggleFollow, viewUserProfile } = useApp();
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('✓ Link copied to clipboard!');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isFollowed = followedUsers.includes(post.author.username);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setNotificationText('✓ Link copied to clipboard!');
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2000);
    }
  };

  const triggerNotification = (text) => {
    setNotificationText(`✓ ${text}`);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 2500);
  };

  return (
    <article
      style={{
        padding: '16px 16px 12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        gap: '12px',
        position: 'relative',
        backgroundColor: post.isAd ? 'var(--bg-primary)' : 'transparent'
      }}
    >
      {/* Left Avatar column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '42px', height: '42px' }}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            onClick={() => viewUserProfile(post.author)}
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Main Content column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Author header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div 
            onClick={() => viewUserProfile(post.author)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {post.author.username}
            </span>
            {post.author.verified && (
              <span style={{ color: 'var(--accent-blue)', fontSize: '14px' }}>✓</span>
            )}
            {post.isAd && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>• Ad</span>
            )}
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              {post.timeAgo}
            </span>
          </div>

          {/* Interactive 3-Dot Options Menu */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              style={{ color: 'var(--text-muted)', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
              title="Post options"
            >
              <MoreHorizontal size={18} />
            </button>

            {isMenuOpen && (
              <>
                <div 
                  onClick={() => setIsMenuOpen(false)} 
                  style={{ position: 'fixed', inset: 0, zIndex: 40 }} 
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '32px',
                    right: 0,
                    zIndex: 50,
                    width: '210px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '6px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    animation: 'fadeIn 0.15s ease-out'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <Link size={15} />
                    <span>Copy link</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(post.id);
                      triggerNotification(post.isSaved ? 'Removed from Saved' : 'Post saved!');
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <Bookmark size={15} fill={post.isSaved ? 'currentColor' : 'none'} />
                    <span>{post.isSaved ? 'Remove from Saved' : 'Save post'}</span>
                  </button>

                  {post.author.username !== 'athiraj.kp' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(post.author.username);
                        triggerNotification(isFollowed ? `Unfollowed @${post.author.username}` : `Following @${post.author.username}`);
                        setIsMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      {isFollowed ? <UserCheck size={15} color="var(--accent-blue)" /> : <UserPlus size={15} />}
                      <span>{isFollowed ? `Unfollow @${post.author.username}` : `Follow @${post.author.username}`}</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerNotification(`Muted @${post.author.username}`);
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <VolumeX size={15} />
                    <span>Mute @{post.author.username}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerNotification('Post hidden from feed');
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <EyeOff size={15} />
                    <span>Not interested</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerNotification('Post reported to moderators');
                      setIsMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#ef4444',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <Flag size={15} />
                    <span>Report post</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status Bubble Note if present */}
        {post.statusNote && (
          <div
            style={{
              alignSelf: 'flex-start',
              border: '1.5px dashed #ccc',
              borderRadius: '16px',
              padding: '6px 14px',
              margin: '4px 0 8px 0',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          >
            💬 {post.content}
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ⏱️ {post.statusNote}
            </div>
          </div>
        )}

        {/* Post Text Content (if not bubble note) */}
        {!post.statusNote && (
          <div style={{ fontSize: '15px', lineHeight: '1.45', color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
            {post.content}
          </div>
        )}

        {/* Special Community Pill Tag */}
        {post.community && (
          <span
            style={{
              fontSize: '12px',
              color: 'var(--accent-blue)',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            ⚙️ {post.community.toLowerCase()}
          </span>
        )}

        {/* Media Image Attachment */}
        {post.media && (
          <div style={{ marginTop: '8px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img
              src={post.media}
              alt="Post attachment"
              style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Ad Graphic Banner if Ad */}
        {post.bannerTitle && (
          <div style={{
            backgroundColor: '#e60000',
            borderRadius: '16px',
            padding: '24px 20px',
            color: '#fff',
            marginTop: '8px'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', lineHeight: '1.2' }}>{post.bannerTitle}</h3>
          </div>
        )}

        {/* Action Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
          <button
            onClick={() => toggleLike(post.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: post.isLiked ? '#ed4956' : 'var(--text-primary)' }}
          >
            <Heart size={20} fill={post.isLiked ? '#ed4956' : 'none'} strokeWidth={post.isLiked ? 0 : 1.8} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.likes > 0 ? post.likes : ''}</span>
          </button>

          <button
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}
          >
            <MessageCircle size={20} strokeWidth={1.8} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.repliesCount > 0 ? post.repliesCount : ''}</span>
          </button>

          <button
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}
          >
            <Repeat size={20} strokeWidth={1.8} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.reposts > 0 ? post.reposts : ''}</span>
          </button>

          <button
            onClick={handleShare}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}
          >
            <Send size={19} strokeWidth={1.8} style={{ transform: 'rotate(-20deg)' }} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.shares > 0 ? post.shares : ''}</span>
          </button>

          <button
            onClick={() => toggleSave(post.id)}
            style={{ marginLeft: 'auto', color: post.isSaved ? 'var(--accent-blue)' : 'var(--text-muted)' }}
            title="Save post"
          >
            <Bookmark size={20} fill={post.isSaved ? 'currentColor' : 'none'} strokeWidth={1.8} />
          </button>
        </div>

        {showShareNotification && (
          <div style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '4px', fontWeight: '500' }}>
            {notificationText}
          </div>
        )}
      </div>
    </article>
  );
};
