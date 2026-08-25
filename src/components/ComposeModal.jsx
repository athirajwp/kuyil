import React, { useState } from 'react';
import { X, Image, Video, Headphones, Radio, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ComposeModal = () => {
  const { isComposeOpen, setIsComposeOpen, addPost, user } = useApp();
  
  // Selected option: 'image' | 'video' | 'listen' | 'voice'
  const [postType, setPostType] = useState('image');

  const [content, setContent] = useState('');
  
  // Image state
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800');
  
  // Video state
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=5qap5aO4i9A');
  
  // Listen Together state
  const [songTitle, setSongTitle] = useState('Aasa Kooda | Sai Abhyankkar');
  const [songArtist, setSongArtist] = useState('Sai Abhyankkar | Think Music');
  
  // Voice Space state
  const [voiceTitle, setVoiceTitle] = useState('Late Night AI & Music Vibes 🎙️');

  if (!isComposeOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = {
      content: content.trim() || defaultCaption(),
      postType
    };

    if (postType === 'image') {
      payload.media = mediaUrl.trim() || null;
    } else if (postType === 'video') {
      payload.videoUrl = videoUrl.trim() || null;
    } else if (postType === 'listen') {
      payload.listenMusic = {
        title: songTitle.trim() || 'Listen Together Room',
        artist: songArtist.trim() || 'Join live audio music session'
      };
    } else if (postType === 'voice') {
      payload.voiceSpace = {
        title: voiceTitle.trim() || 'Voice Space Group',
        listenersCount: 1
      };
    }

    addPost(payload);

    // Reset and close
    setContent('');
    setIsComposeOpen(false);
  };

  const defaultCaption = () => {
    switch (postType) {
      case 'image': return 'Sharing a vibe 📸';
      case 'video': return 'Check out this video 🎥';
      case 'listen': return 'Listening to this track! Join the room 🎧';
      case 'voice': return 'Live Voice Space Group starting now! Drop in 🎙️';
      default: return '';
    }
  };

  const sampleImages = [
    { label: 'Vibe Art', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' },
    { label: 'Music Stage', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800' },
    { label: 'Acoustic Jam', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800' }
  ];

  const sampleVideos = [
    { label: 'Lofi Beats Video', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
    { label: 'Synthwave Video', url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY' }
  ];

  const sampleSongs = [
    { title: 'Aasa Kooda', artist: 'Sai Abhyankkar' },
    { title: 'Nallaru Po', artist: 'Pradeep Ranganathan' },
    { title: 'Neeye Neeye', artist: 'Phani Kalyan' }
  ];

  const sampleVoiceTopics = [
    'Late Night AI & Music Vibes 🎙️',
    'Tech & Coding Drop-In Space 💻',
    'Chill Guitar & Song Requests 🎸'
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(6px)',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
            Create Post
          </h2>
          <button
            onClick={() => setIsComposeOpen(false)}
            style={{ padding: '6px', borderRadius: '50%', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User profile section */}
        <div style={{ padding: '14px 20px 0 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{user.name}</span>
        </div>

        {/* 4 Posting Options Bar - ONLY THESE 4 PRESENT */}
        <div style={{ padding: '14px 20px 0 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[
            { id: 'image', label: 'Image', icon: Image, color: '#3b82f6' },
            { id: 'video', label: 'Video', icon: Video, color: '#ef4444' },
            { id: 'listen', label: 'Listen', icon: Headphones, color: '#10b981' },
            { id: 'voice', label: 'VoiceSpace', icon: Radio, color: '#8b5cf6' }
          ].map(opt => {
            const Icon = opt.icon;
            const isSelected = postType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPostType(opt.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '10px 4px',
                  borderRadius: '14px',
                  backgroundColor: isSelected ? 'var(--bg-secondary)' : 'transparent',
                  border: isSelected ? `2px solid ${opt.color}` : '1px solid var(--border-color)',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={20} color={isSelected ? opt.color : 'var(--text-muted)'} />
                <span style={{ fontSize: '11px', fontWeight: isSelected ? '800' : '600' }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Add a caption for your ${postType} post...`}
            style={{
              width: '100%',
              fontSize: '15px',
              lineHeight: '1.5',
              color: 'var(--text-primary)',
              resize: 'none',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent'
            }}
          />

          {/* Option 1: Image Configuration */}
          {postType === 'image' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>Image URL:</label>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Paste Image URL..."
                style={{
                  fontSize: '13px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  width: '100%'
                }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {sampleImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMediaUrl(img.url)}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: mediaUrl === img.url ? 'var(--accent-blue)' : 'var(--bg-primary)',
                      color: mediaUrl === img.url ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option 2: Video Configuration */}
          {postType === 'video' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>Video / YouTube URL:</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste Video URL..."
                style={{
                  fontSize: '13px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  width: '100%'
                }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {sampleVideos.map((vid, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setVideoUrl(vid.url)}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: videoUrl === vid.url ? '#ef4444' : 'var(--bg-primary)',
                      color: videoUrl === vid.url ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    {vid.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option 3: Listen Music Together Configuration */}
          {postType === 'listen' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>Song & Artist to Listen Together:</label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Song Title..."
                style={{
                  fontSize: '13px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  width: '100%'
                }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {sampleSongs.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSongTitle(s.title);
                      setSongArtist(s.artist);
                    }}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: songTitle === s.title ? '#10b981' : 'var(--bg-primary)',
                      color: songTitle === s.title ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    🎧 {s.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option 4: VoiceSpace Group Configuration */}
          {postType === 'voice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>Voice Space Group Topic:</label>
              <input
                type="text"
                value={voiceTitle}
                onChange={(e) => setVoiceTitle(e.target.value)}
                placeholder="Voice Space Room Topic..."
                style={{
                  fontSize: '13px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  width: '100%'
                }}
              />
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {sampleVoiceTopics.map((top, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setVoiceTitle(top)}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: voiceTitle === top ? '#8b5cf6' : 'var(--bg-primary)',
                      color: voiceTitle === top ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    🎙️ {top}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Post Action Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="submit"
              style={{
                padding: '10px 24px',
                borderRadius: '20px',
                backgroundColor: 'var(--accent-blue)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>Post</span>
              <Send size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

