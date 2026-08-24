import React from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/PostCard';

export const SavedView = () => {
  const { posts } = useApp();
  const savedPosts = posts.filter(p => p.isSaved);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '60vh' }}>
      {savedPosts.length > 0 ? (
        savedPosts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        /* Matching Screenshot 16 */
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          Posts you save will appear here.
        </div>
      )}
    </div>
  );
};

export const LikedView = () => {
  const { posts } = useApp();
  const likedPosts = posts.filter(p => p.isLiked);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top summary counter bar matching Screenshot 17 */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--text-primary)'
      }}>
        <span style={{ color: '#ed4956' }}>❤️ 44.9K</span>
        <span>💬 356</span>
        <span>🔄 492</span>
        <span>✈️ 1.1K</span>
      </div>

      {likedPosts.length > 0 ? (
        likedPosts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <div style={{
          padding: '80px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          Posts you like will appear here.
        </div>
      )}
    </div>
  );
};
