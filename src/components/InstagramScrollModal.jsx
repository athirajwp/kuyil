import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  UserCheck, 
  UserPlus, 
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InstagramScrollModal = () => {
  const context = useApp() || {};
  const { 
    isScrollModalOpen = false, 
    closeScrollMode = () => {}, 
    selectedPostIdForScroll = null, 
    posts = [], 
    user = { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', name: 'User' }, 
    toggleLike = () => {}, 
    toggleSave = () => {}, 
    followedUsers = [], 
    toggleFollow = () => {}, 
    viewUserProfile = () => {},
    postComments = {},
    addCommentToPost = () => {}
  } = context;

  const containerRef = useRef(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Scroll directly to the selected post on open
  useEffect(() => {
    if (isScrollModalOpen && selectedPostIdForScroll) {
      setTimeout(() => {
        const el = document.getElementById(`scroll-post-${selectedPostIdForScroll}`);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 50);
    }
  }, [isScrollModalOpen, selectedPostIdForScroll]);

  if (!isScrollModalOpen) return null;

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    const inputVal = commentInputs[postId]?.trim();
    if (!inputVal) return;

    if (typeof addCommentToPost === 'function') {
      addCommentToPost(postId, inputVal);
    }

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postId) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      {/* Sticky Top Header */}
      <header
        style={{
          height: '56px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          flexShrink: 0
        }}
      >
        <button
          onClick={closeScrollMode}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '700'
          }}
          title="Back to Feed"
        >
          <ArrowLeft size={22} color="var(--text-primary)" />
          <span>Explore Vibes</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} color="var(--accent-blue)" />
          <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Scroll Feed
          </span>
        </div>

        <button
          onClick={closeScrollMode}
          style={{
            padding: '6px',
            borderRadius: '50%',
            color: 'var(--text-secondary)',
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>
      </header>

      {/* Copy Notification Toast */}
      {copiedNotification && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--accent-blue)',
          color: '#ffffff',
          padding: '8px 18px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '700',
          zIndex: 300,
          boxShadow: 'var(--shadow-md)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          ✓ Link copied to clipboard!
        </div>
      )}

      {/* Vertical Scroll Feed Container (Adapts automatically to light/dark themes) */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          height: 'calc(100vh - 56px)',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          scrollbarWidth: 'none',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        {(posts || []).map((post) => {
          if (!post) return null;
          const authorName = post.author?.name || post.author?.username || 'User';
          const authorHandle = post.author?.username || 'user';
          const authorAvatar = post.author?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
          const isFollowed = (followedUsers && authorHandle) ? followedUsers.includes(authorHandle) : false;
          const commentsList = (postComments && postComments[post.id]) || [];

          return (
            <div
              key={post.id}
              id={`scroll-post-${post.id}`}
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'calc(100vh - 56px)',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {/* Post Author Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
                <div 
                  onClick={() => {
                    closeScrollMode();
                    if (post.author) viewUserProfile(post.author);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                >
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {authorHandle}
                      </span>
                      {post.author?.verified && (
                        <span style={{ color: 'var(--accent-blue)', fontSize: '13px' }}>✓</span>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.timeAgo}</span>
                  </div>
                </div>

                {authorHandle !== user?.username && (
                  <button
                    onClick={() => toggleFollow && toggleFollow(authorHandle)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '700',
                      backgroundColor: isFollowed ? 'var(--bg-secondary)' : 'var(--accent-blue)',
                      color: isFollowed ? 'var(--text-primary)' : '#ffffff',
                      border: isFollowed ? '1px solid var(--border-color)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isFollowed ? <UserCheck size={14} /> : <UserPlus size={14} />}
                    <span>{isFollowed ? 'Following' : 'Follow'}</span>
                  </button>
                )}
              </div>

              {/* Main Media / Content Area */}
              <div style={{ flex: 1, minHeight: 0, width: '100%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                {post.media && !post.videoUrl && (
                  <img
                    src={post.media}
                    alt="Post attachment"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                )}

                {post.videoUrl && (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
                    {post.videoUrl.includes('youtube.com') || post.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={post.videoUrl.replace('watch?v=', 'embed/')}
                        title="Video attachment"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                      />
                    ) : (
                      <video controls src={post.videoUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    )}
                  </div>
                )}

                {!post.media && !post.videoUrl && (
                  <div style={{ padding: '24px', textAlign: 'center', fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.5', maxWidth: '85%' }}>
                    {post.content}
                  </div>
                )}

                {post.listenMusic && (
                  <div style={{ padding: '20px', backgroundColor: 'var(--bg-card)', borderRadius: '20px', width: '85%', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '28px', backgroundColor: 'rgba(24, 119, 242, 0.15)', width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      🎧
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-blue)', textTransform: 'uppercase' }}>Listen Together</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.listenMusic.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{post.listenMusic.artist}</div>
                    </div>
                  </div>
                )}

                {post.voiceSpace && (
                  <div style={{ padding: '20px', backgroundColor: 'rgba(139, 92, 246, 0.12)', borderRadius: '20px', width: '85%', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                    <div style={{ fontSize: '28px', backgroundColor: 'rgba(139, 92, 246, 0.2)', width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      🎙️
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#a855f7', textTransform: 'uppercase' }}>Voice Space</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.voiceSpace.title}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Info Bar: Caption, Likes, Share, Comments */}
              <div style={{ flexShrink: 0, backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                {/* Caption (if media exists) */}
                {(post.media || post.videoUrl) && post.content && (
                  <div style={{ padding: '10px 16px 4px 16px', fontSize: '13px', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', marginRight: '6px' }}>{authorHandle}</span>
                    {post.content}
                  </div>
                )}

                {/* Instagram Action Buttons Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <button
                      onClick={() => toggleLike && toggleLike(post.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', color: post.isLiked ? '#ef4444' : 'var(--text-primary)' }}
                    >
                      <Heart size={24} fill={post.isLiked ? '#ef4444' : 'none'} color={post.isLiked ? '#ef4444' : 'var(--text-primary)'} />
                      <span style={{ fontSize: '13px', fontWeight: '700' }}>{post.likes}</span>
                    </button>

                    <button
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}
                    >
                      <MessageCircle size={24} color="var(--text-primary)" />
                      <span style={{ fontSize: '13px', fontWeight: '700' }}>{(post.repliesCount || 0) + commentsList.length}</span>
                    </button>

                    <button
                      onClick={() => handleShare(post.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-primary)' }}
                    >
                      <Send size={22} color="var(--text-primary)" style={{ transform: 'rotate(-20deg)' }} />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSave && toggleSave(post.id)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: post.isSaved ? 'var(--accent-blue)' : 'var(--text-primary)' }}
                  >
                    <Bookmark size={24} fill={post.isSaved ? 'var(--accent-blue)' : 'none'} color={post.isSaved ? 'var(--accent-blue)' : 'var(--text-primary)'} />
                  </button>
                </div>

                {/* Inline Comment Section */}
                <div style={{ padding: '4px 16px 0 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {commentsList.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '60px', overflowY: 'auto', scrollbarWidth: 'none' }}>
                      {commentsList.map((comment) => (
                        <div key={comment.id} style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                          <span style={{ fontWeight: '700', color: 'var(--text-primary)', marginRight: '6px' }}>{comment.author?.username || 'user'}</span>
                          {comment.text}
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={(e) => handleAddComment(post.id, e)} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      style={{
                        flex: 1,
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '14px',
                        padding: '6px 12px',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!commentInputs[post.id]?.trim()}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: commentInputs[post.id]?.trim() ? 'var(--accent-blue)' : 'var(--text-muted)',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: commentInputs[post.id]?.trim() ? 'pointer' : 'default'
                      }}
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstagramScrollModal;
