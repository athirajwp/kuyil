import React, { useState } from 'react';
import { 
  Headphones, 
  Radio, 
  Sparkles, 
  Image, 
  Video,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';

const QuickComposer = () => {
  const { user, addPost, setIsComposeOpen } = useApp();
  const [content, setContent] = useState('');
  const [activeOption, setActiveOption] = useState(null); // null | 'image' | 'video' | 'listen' | 'voice'
  const [mediaUrl, setMediaUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [voiceTitle, setVoiceTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultCaption = (type) => {
    switch (type) {
      case 'image': return 'Sharing a new photo vibe 📸';
      case 'video': return 'Check out this video! 🎥';
      case 'listen': return 'Listening to music together 🎧';
      case 'voice': return 'Live Voice Space starting now! Drop in 🎙️';
      default: return '';
    }
  };

  const handleQuickPost = (e) => {
    e.preventDefault();
    if (!content.trim() && !activeOption && !mediaUrl && !videoUrl && !songTitle && !voiceTitle) return;

    let payload = {
      content: content.trim() || defaultCaption(activeOption),
      postType: activeOption || 'text'
    };

    if (activeOption === 'image') {
      payload.media = mediaUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800';
    } else if (activeOption === 'video') {
      payload.videoUrl = videoUrl.trim() || 'https://www.youtube.com/watch?v=5qap5aO4i9A';
    } else if (activeOption === 'listen') {
      payload.listenMusic = {
        title: songTitle.trim() || 'Aasa Kooda | Sai Abhyankkar',
        artist: `${user.name} • Live Session`
      };
    } else if (activeOption === 'voice') {
      payload.voiceSpace = {
        title: voiceTitle.trim() || 'Late Night AI & Music Vibes 🎙️',
        listenersCount: 1
      };
    }

    addPost(payload);

    // Reset and collapse
    setContent('');
    setActiveOption(null);
    setMediaUrl('');
    setVideoUrl('');
    setSongTitle('');
    setVoiceTitle('');
    setIsExpanded(false);
  };

  const handleOptionClick = (optionId) => {
    if (activeOption === optionId) {
      setActiveOption(null);
    } else {
      setActiveOption(optionId);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: '24px',
      padding: isExpanded ? '18px 20px' : '14px 18px',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: isExpanded ? '14px' : '0px',
      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Header with Avatar & Input */}
      <div 
        onClick={() => setIsExpanded(true)}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <textarea
            rows={isExpanded ? 3 : 1}
            value={content}
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user.name.split(' ')[0]}? Share a vibe...`}
            style={{
              width: '100%',
              fontSize: '15px',
              color: 'var(--text-primary)',
              resize: 'none',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              paddingTop: isExpanded ? '4px' : '2px',
              lineHeight: '1.45',
              cursor: 'pointer',
              overflow: 'hidden',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          />
        </div>
      </div>

      {/* EXPANDED CONTENT: Options, Attachments, Actions */}
      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeIn 0.2s ease-out' }}>
          {/* Inline Option Attachment Inputs */}
          {activeOption === 'image' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Image size={14} /> <span>Attach Photo / Image URL</span>
              </div>
              <input
                type="text"
                placeholder="Paste image URL (or tap a preset below)..."
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                style={{ width: '100%', fontSize: '13px', padding: '8px 12px', borderRadius: '10px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingTop: '2px', scrollbarWidth: 'none' }}>
                {[
                  { label: 'Art Vibe', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' },
                  { label: 'Music Stage', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800' },
                  { label: 'Pet Buddy', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800' }
                ].map((preset, i) => (
                  <div
                    key={i}
                    onClick={() => setMediaUrl(preset.url)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 10px',
                      borderRadius: '10px',
                      backgroundColor: mediaUrl === preset.url ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-card)',
                      border: mediaUrl === preset.url ? '1px solid #3b82f6' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      flexShrink: 0
                    }}
                  >
                    <img src={preset.url} alt={preset.label} style={{ width: '24px', height: '24px', borderRadius: '6px', objectFit: 'cover' }} />
                    <span>{preset.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeOption === 'listen' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Headphones size={14} /> <span>Listen Together Track Title</span>
              </div>
              <input
                type="text"
                placeholder="e.g. Aasa Kooda - Sai Abhyankkar"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                style={{ width: '100%', fontSize: '13px', padding: '8px 12px', borderRadius: '10px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
          )}

          {activeOption === 'voice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 14px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={14} /> <span>Voice Space Topic Name</span>
              </div>
              <input
                type="text"
                placeholder="e.g. Late Night Tech & Code Chat 🎙️"
                value={voiceTitle}
                onChange={(e) => setVoiceTitle(e.target.value)}
                style={{ width: '100%', fontSize: '13px', padding: '8px 12px', borderRadius: '10px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
          )}

          {/* Posting Options Buttons Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'image', label: 'Photo', icon: Image, color: '#3b82f6' },
                { id: 'listen', label: 'Music', icon: Headphones, color: '#10b981' },
                { id: 'voice', label: 'Voice', icon: Radio, color: '#8b5cf6' }
              ].map(opt => {
                const Icon = opt.icon;
                const isSelected = activeOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionClick(opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'var(--bg-secondary)' : 'transparent',
                      border: isSelected ? `1.5px solid ${opt.color}` : '1px solid var(--border-color)',
                      color: isSelected ? opt.color : 'var(--text-secondary)',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={16} color={opt.color} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setActiveOption(null);
                }}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleQuickPost}
                disabled={!content.trim() && !activeOption && !mediaUrl && !videoUrl && !songTitle && !voiceTitle}
                className="pill active"
                style={{
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  backgroundColor: 'var(--accent-blue)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '20px',
                  opacity: (!content.trim() && !activeOption && !mediaUrl && !videoUrl && !songTitle && !voiceTitle) ? 0.5 : 1,
                  cursor: (!content.trim() && !activeOption && !mediaUrl && !videoUrl && !songTitle && !voiceTitle) ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 149, 246, 0.25)'
                }}
              >
                Post Vibe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const FeedView = () => {
  const {
    user,
    posts,
    triggerKuyilFlight
  } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 16px 40px 16px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
      
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.12) 0%, rgba(139, 92, 246, 0.15) 100%)',
        borderRadius: '24px',
        padding: '20px 24px',
        border: '1px solid rgba(24, 119, 242, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-blue)', flexShrink: 0 }}
          />
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.4px' }}>
              Welcome to Kuyil ✨
            </h1>
          </div>
        </div>

        <button
          onClick={triggerKuyilFlight}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-blue)',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0
          }}
          title="Fly Kuyil Bird Animation"
        >
          <Sparkles size={14} />
          <span>Vibe</span>
        </button>
      </div>

      {/* HOMEPAGE POSTING OPTIONS & QUICK CREATOR WIDGET */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)' }}>
            Post Your Vibe
          </span>
        </div>
        <QuickComposer />
      </div>

      {/* HOMEPAGE POSTS FEED ("VIBES FEED") */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)' }}>
            <Sparkles size={14} color="var(--accent-blue)" />
            <span>Community Feed ({posts.length})</span>
          </div>
        </div>

        {/* List of Posts */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '24px', 
          border: '1px solid var(--border-color)', 
          overflow: 'hidden', 
          boxShadow: 'var(--shadow-sm)' 
        }}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default FeedView;
