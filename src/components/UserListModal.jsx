import React, { useState } from 'react';
import { X, UserPlus, Check, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MOCK_FOLLOWERS = [
  { id: 'u2', name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", bio: "Tech enthusiast & UI designer ✨ | Listening to tech podcasts" },
  { id: 'u3', name: "Luna Trader", username: "lunaxtrader", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", bio: "Crypto & Forex trader 📈 | Chennai meetup host" },
  { id: 'u4', name: "Tech Reader", username: "techrader71", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", bio: "Gadget reviewer & AI tinkerer 🤖 | 50k sub YouTube" },
  { id: 'u5', name: "Eli Tech", username: "eli.tech9", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150", bio: "Building solo SaaS products 🚀 | React & Node.js" },
  { id: 'u6', name: "Classy Queen", username: "its_classy_queen_43", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150", bio: "Tamil vibes & motivation quotes 💫 | Lifestyle vlogger" }
];

const MOCK_FOLLOWING = [
  { id: 'u2', name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", bio: "Tech enthusiast & UI designer ✨ | Listening to tech podcasts" },
  { id: 'u4', name: "Tech Reader", username: "techrader71", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", bio: "Gadget reviewer & AI tinkerer 🤖 | 50k sub YouTube" },
  { id: 'u7', name: "Ashwa", username: "im.ashwaaa", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", bio: "Learning C & systems programming 💻 | Coffee lover" },
  { id: 'u8', name: "Boleh Bromy", username: "bolehbromy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", bio: "AI prompts developer & tech builder ⚙️" }
];

const MOCK_FRIENDS = [
  { id: 'u2', name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", bio: "Tech enthusiast & UI designer ✨ | Listening to tech podcasts" },
  { id: 'u4', name: "Tech Reader", username: "techrader71", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", bio: "Gadget reviewer & AI tinkerer 🤖 | 50k sub YouTube" }
];

export const UserListModal = ({ isOpen, onClose, initialTab = 'followers', targetUser }) => {
  const { followedUsers, toggleFollow, viewUserProfile } = useApp();
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  const currentDisplayUser = targetUser || { name: 'User' };

  const getListForTab = () => {
    switch (activeTab) {
      case 'followers':
        return targetUser?.followersList || MOCK_FOLLOWERS;
      case 'following':
        return targetUser?.followingList || MOCK_FOLLOWING;
      case 'friends':
        return targetUser?.friendsList || MOCK_FRIENDS;
      default:
        return MOCK_FOLLOWERS;
    }
  };

  const listItems = getListForTab();

  const handleSelectUser = (person) => {
    viewUserProfile(person);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: '85vh'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              {currentDisplayUser.name}'s Network
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0', fontWeight: '600' }}>
              @{currentDisplayUser.username || 'user'}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          {[
            { id: 'friends', label: `Friends (${(targetUser?.friendsCount || MOCK_FRIENDS.length)})` },
            { id: 'followers', label: `Followers (${(targetUser?.followersCount || MOCK_FOLLOWERS.length)})` },
            { id: 'following', label: `Following (${(targetUser?.followingCount || MOCK_FOLLOWING.length)})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 0',
                fontSize: '13px',
                fontWeight: '700',
                color: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '2.5px solid var(--accent-blue)' : '2.5px solid transparent',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: activeTab === tab.id ? 'var(--bg-card)' : 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* User List Body */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
          {listItems.length === 0 ? (
            <div style={{ padding: '30px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Users size={28} style={{ opacity: 0.5, marginBottom: '8px' }} />
              <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>No users found</p>
            </div>
          ) : (
            listItems.map((person) => {
              const isFollowing = followedUsers.includes(person.username);

              return (
                <div
                  key={person.id || person.username}
                  onClick={() => handleSelectUser(person)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                    <img
                      src={person.avatar}
                      alt={person.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {person.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '1px 0 0 0' }}>
                        @{person.username}
                      </p>
                      {person.bio && (
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '3px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {person.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Follow / Unfollow / Add Friend Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(person.username);
                    }}
                    className={`pill ${isFollowing ? '' : 'active'}`}
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {isFollowing ? (
                      <>
                        <Check size={14} color="#22c55e" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
