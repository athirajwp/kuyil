import React from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';

export const FeedView = () => {
  const { posts, selectedCommunity } = useApp();

  const filteredPosts = selectedCommunity 
    ? posts.filter(p => p.community?.toLowerCase() === selectedCommunity.name.toLowerCase())
    : posts;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
