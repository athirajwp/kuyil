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
  Flag,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PostCard = ({ post }) => {
  const { toggleLike, toggleSave, followedUsers, toggleFollow, viewUserProfile, setActiveTab, user, deletePost, openScrollMode, postComments = {}, addCommentToPost } = useApp();
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('✓ Link copied to clipboard!');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isFollowed = followedUsers.includes(post.author.username);
  const currentComments = postComments[post.id] || [];

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
      onClick={() => openScrollMode && openScrollMode(post.id)}
      style={{
        padding: '16px 16px 12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        gap: '12px',
        position: 'relative',
        backgroundColor: post.isAd ? 'var(--bg-primary)' : 'transparent',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Left Avatar column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ position: 'relative', width: '42px', height: '42px' }}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            onClick={(e) => {
              e.stopPropagation();
              viewUserProfile(post.author);
            }}
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Main Content column */}
      <div style={{ flex: 1, minWidth: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Author header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              viewUserProfile(post.author);
            }}
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

                  {(post.author.username === user?.username || post.author.username === 'athiraj.kp') ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePost(post.id);
                        triggerNotification('Post deleted!');
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
                      <Trash2 size={15} color="#ef4444" />
                      <span>Delete post</span>
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
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

        {/* 1. Image Attachment */}
        {post.media && !post.videoUrl && (
          <div style={{ marginTop: '8px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img
              src={post.media}
              alt="Post attachment"
              style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* 2. Video Attachment */}
        {post.videoUrl && (
          <div style={{ marginTop: '8px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#000' }}>
            {post.videoUrl.includes('youtube.com') || post.videoUrl.includes('youtu.be') ? (
              <iframe
                src={post.videoUrl.replace('watch?v=', 'embed/')}
                title="Video attachment"
                style={{ width: '100%', height: '260px', border: 'none' }}
                allowFullScreen
              />
            ) : (
              <video controls src={post.videoUrl} style={{ width: '100%', maxHeight: '380px', display: 'block' }} />
            )}
          </div>
        )}

        {/* 3. Listen Music Together Attachment */}
        {post.listenMusic && (
          <div
            style={{
              marginTop: '10px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '10px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '18px', backgroundColor: 'var(--bg-primary)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                🎧
              </div>
              <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {post.listenMusic.title || 'Listen Together Track'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {post.listenMusic.artist || 'Tap to listen together live'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('listen')}
              className="pill active"
              style={{ padding: '5px 10px', fontSize: '11px', fontWeight: '700', flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              🎧 Listen
            </button>
          </div>
        )}

        {/* 4. VoiceSpace Group Attachment */}
        {post.voiceSpace && (
          <div
            style={{
              marginTop: '10px',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid var(--accent-blue)',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              overflow: 'hidden',
              maxWidth: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
              <span className="pill" style={{ fontSize: '10px', fontWeight: '800', backgroundColor: 'var(--accent-blue)', color: '#fff', padding: '4px 10px' }}>
                🎙️ LIVE VOICE SPACE
              </span>
              <span style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: '700' }}>● {post.voiceSpace.listenersCount || 1} listening</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', wordBreak: 'break-word' }}>
              {post.voiceSpace.title || 'Voice Space Group'}
            </div>
            <button
              onClick={() => setActiveTab('voice')}
              className="pill active"
              style={{ padding: '8px 16px', fontSize: '13px', fontWeight: '700', textAlign: 'center', marginTop: '4px', cursor: 'pointer', width: '100%' }}
            >
              🎙️ Join Voice Space
            </button>
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
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(post.id);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: post.isLiked ? '#ed4956' : 'var(--text-primary)' }}
          >
            <Heart size={20} fill={post.isLiked ? '#ed4956' : 'none'} strokeWidth={post.isLiked ? 0 : 1.8} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.likes > 0 ? post.likes : ''}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCommentsExpanded(!isCommentsExpanded);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isCommentsExpanded ? 'var(--accent-blue)' : 'var(--text-primary)' }}
            title="Comments"
          >
            <MessageCircle size={20} strokeWidth={1.8} fill={isCommentsExpanded ? 'rgba(0, 149, 246, 0.15)' : 'none'} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{(post.repliesCount || 0) + currentComments.length > 0 ? (post.repliesCount || 0) + currentComments.length : ''}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openScrollMode && openScrollMode(post.id);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}
          >
            <Repeat size={20} strokeWidth={1.8} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.reposts > 0 ? post.reposts : ''}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}
          >
            <Send size={19} strokeWidth={1.8} style={{ transform: 'rotate(-20deg)' }} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{post.shares > 0 ? post.shares : ''}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(post.id);
            }}
            style={{ marginLeft: 'auto', color: post.isSaved ? 'var(--accent-blue)' : 'var(--text-muted)' }}
            title="Save post"
          >
            <Bookmark size={20} fill={post.isSaved ? 'currentColor' : 'none'} strokeWidth={1.8} />
          </button>
        </div>

        {/* INLINE COMMENT SECTION DRAWER */}
        {isCommentsExpanded && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {/* List of comments */}
            {currentComments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', scrollbarWidth: 'none' }}>
                {currentComments.map((c) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                    <img
                      src={c.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={c.author?.username || 'user'}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: '2px' }}
                    />
                    <div style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '14px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-primary)' }}>
                        {c.author?.username || 'user'}
                      </div>
                      <div style={{ color: 'var(--text-primary)', marginTop: '2px', lineHeight: '1.35' }}>
                        {c.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', paddingLeft: '4px' }}>
                No comments yet. Share your thoughts!
              </div>
            )}

            {/* Comment Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!commentText.trim()) return;
                if (typeof addCommentToPost === 'function') {
                  addCommentToPost(post.id, commentText);
                }
                setCommentText('');
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '7px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--accent-blue)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: commentText.trim() ? 'pointer' : 'default',
                  opacity: commentText.trim() ? 1 : 0.5
                }}
              >
                Post
              </button>
            </form>
          </div>
        )}

        {showShareNotification && (
          <div style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '4px', fontWeight: '500' }}>
            {notificationText}
          </div>
        )}
      </div>
    </article>
  );
};
