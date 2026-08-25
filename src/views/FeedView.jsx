import React from 'react';
import { Image, Send, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';

export const FeedView = () => {
  const { posts, selectedCommunity, user, setIsComposeOpen } = useApp();

  const filteredPosts = selectedCommunity 
    ? posts.filter(p => p.community?.toLowerCase() === selectedCommunity.name.toLowerCase())
    : posts;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Community Banner Header if filtered */}
      {selectedCommunity && (
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>{selectedCommunity.icon}</span>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>{selectedCommunity.name}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedCommunity.count} members • Active discussion</p>
          </div>
        </div>
      )}

      {/* Top Feed Compose Prompt Bar */}
      <div 
        onClick={() => setIsComposeOpen(true)}
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'var(--bg-primary)',
          cursor: 'pointer'
        }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '24px',
            padding: '10px 14px',
            fontSize: '14px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--border-color)',
            minWidth: 0,
            overflow: 'hidden'
          }}
        >
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, flex: 1, marginRight: '8px' }}>
            Share your music vibe or thought...
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-blue)', flexShrink: 0 }}>
            <Image size={16} />
            <span style={{ fontSize: '13px', fontWeight: '700' }}>Post</span>
          </div>
        </div>
      </div>

      {/* Posts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>No vibes found in this feed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
