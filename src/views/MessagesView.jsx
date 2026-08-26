import React, { useState, useEffect } from 'react';
import { Search, Send, ArrowLeft, UserPlus, Check, Sparkles, Shuffle, MessageSquare, CheckCircle, XCircle, Users, Radio, Sparkle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagesView = () => {
  const {
    conversations,
    activeChat,
    setActiveChat,
    onlineUsers,
    messageRequests,
    startConversationWithUser,
    acceptMessageRequest,
    declineMessageRequest,
    followedUsers,
    toggleFollow,
    viewUserProfile
  } = useApp();

  const [filter, setFilter] = useState('inbox'); // 'inbox', 'requests', 'find'
  const [searchQuery, setSearchQuery] = useState('');
  const [interestFilter, setInterestFilter] = useState('All');
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', sender: 'other', text: 'Hey Athi! Checked out your new Vibespace app design!', time: '10:14 AM' },
    { id: 'm2', sender: 'me', text: 'Thanks! Replicated Meta Threads with React & 100% precision.', time: '10:15 AM' }
  ]);

  // Random Friend Matcher State
  const [randomMatch, setRandomMatch] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Initialize random match from onlineUsers
  useEffect(() => {
    if (onlineUsers && onlineUsers.length > 0 && !randomMatch) {
      const idx = Math.floor(Math.random() * onlineUsers.length);
      setRandomMatch(onlineUsers[idx]);
    }
  }, [onlineUsers]);

  const handlePickNextRandom = () => {
    if (!onlineUsers || onlineUsers.length === 0) return;
    setIsSpinning(true);
    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * onlineUsers.length);
      // Try to pick a different user if possible
      if (onlineUsers.length > 1 && onlineUsers[nextIdx].id === randomMatch?.id) {
        nextIdx = (nextIdx + 1) % onlineUsers.length;
      }
      setRandomMatch(onlineUsers[nextIdx]);
      setIsSpinning(false);
    }, 350);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages(prev => [...prev, {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: messageInput,
      time: 'Just now'
    }]);
    setMessageInput('');
  };

  // Filter conversations for Inbox
  const filteredConversations = conversations.filter(c =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter online users for Find Friends tab
  const filteredOnlineUsers = (onlineUsers || []).filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.interests && u.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesInterest = interestFilter === 'All' || (u.interests && u.interests.includes(interestFilter));

    return matchesSearch && matchesInterest;
  });

  // Active Chat Screen
  if (activeChat) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
        {/* Chat Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--bg-card)' }}>
          <button
            onClick={() => setActiveChat(null)}
            style={{ color: 'var(--text-primary)', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <ArrowLeft size={22} />
          </button>
          <div style={{ position: 'relative' }}>
            <img
              src={activeChat.user.avatar}
              alt={activeChat.user.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{
              position: 'absolute',
              bottom: '1px',
              right: '1px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              border: '2px solid var(--bg-card)'
            }} />
          </div>
          <div
            onClick={() => viewUserProfile(activeChat.user)}
            style={{ cursor: 'pointer', flex: 1 }}
          >
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{activeChat.user.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>@{activeChat.user.username}</div>
          </div>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {chatMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                maxWidth: '78%',
                backgroundColor: msg.sender === 'me' ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                color: msg.sender === 'me' ? '#ffffff' : 'var(--text-primary)',
                padding: '10px 14px',
                borderRadius: '18px',
                fontSize: '15px',
                lineHeight: '1.4',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>{msg.text}</div>
              <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', backgroundColor: 'var(--bg-card)' }}>
          <input
            type="text"
            placeholder="Write a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '15px',
              border: '1px solid var(--border-color)',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="pill active"
            style={{ padding: '8px 18px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', border: 'none' }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 16px 32px 16px', gap: '16px', maxWidth: '620px', margin: '0 auto', width: '100%' }}>
      {/* Title & Quick Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.6px', color: 'var(--text-primary)', margin: 0 }}>
            Messages
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '2px 0 0 0' }}>
            Chat with friends & find online connections
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'var(--bg-card)',
        padding: '10px 16px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          placeholder={filter === 'find' ? "Search online friends by name or interest..." : "Search messages..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', fontSize: '14px', color: 'var(--text-primary)', border: 'none', background: 'none', outline: 'none' }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('inbox')}
          className={`pill ${filter === 'inbox' ? 'active' : ''}`}
          style={{ padding: '7px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
        >
          Inbox ({conversations.length})
        </button>

        <button
          onClick={() => setFilter('requests')}
          className={`pill ${filter === 'requests' ? 'active' : ''}`}
          style={{ padding: '7px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <span>Requests</span>
          {messageRequests.length > 0 && (
            <span style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '800',
              padding: '1px 6px',
              borderRadius: '10px'
            }}>
              {messageRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setFilter('find')}
          className={`pill ${filter === 'find' ? 'active' : ''}`}
          style={{
            padding: '7px 16px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
          <span>Find Friends</span>
        </button>
      </div>

      {/* TAB 1: INBOX */}
      {filter === 'inbox' && (
        <>
          {filteredConversations.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              {filteredConversations.map(conv => {
                const isOnline = onlineUsers.some(u => u.username === conv.user.username);

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveChat(conv)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease, background-color 0.15s ease'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={conv.user.avatar}
                        alt={conv.user.name}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      {isOnline && (
                        <span style={{
                          position: 'absolute',
                          bottom: '1px',
                          right: '1px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: '#22c55e',
                          border: '2px solid var(--bg-card)'
                        }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {conv.user.name}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{conv.time}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '40px', paddingBottom: '20px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px' }}>
                💬
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {searchQuery ? "No matching messages found" : "Keep it real in direct messages"}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '280px', marginBottom: '20px' }}>
                {searchQuery ? `Try searching for another friend's name or keyword.` : `Start a side conversation, connect with online friends, and more.`}
              </p>
              <button
                onClick={() => setFilter('find')}
                className="pill active"
                style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Users size={16} />
                <span>Find Online Friends</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* TAB 2: REQUESTS */}
      {filter === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
          {messageRequests.length > 0 ? (
            messageRequests.map(req => (
              <div
                key={req.id}
                style={{
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={req.user.avatar}
                    alt={req.user.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                        {req.user.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{req.time}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '1px 0 0 0' }}>
                      @{req.user.username}
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '12px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  lineHeight: '1.4'
                }}>
                  "{req.message}"
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => declineMessageRequest(req.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Decline
                  </button>

                  <button
                    onClick={() => acceptMessageRequest(req.id)}
                    className="pill active"
                    style={{
                      padding: '8px 18px',
                      borderRadius: '14px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle size={14} />
                    <span>Accept & Chat</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '40px', paddingBottom: '20px', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '14px' }}>
                📬
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                No Message Requests
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '260px' }}>
                When someone you don't follow sends you a message, it will appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FIND ONLINE FRIENDS & RANDOM MATCHER */}
      {filter === 'find' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* HERO CARD: 🎲 Match Random Online Friend */}
          {randomMatch && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.12) 0%, rgba(139, 92, 246, 0.15) 100%)',
              border: '1px solid rgba(24, 119, 242, 0.25)',
              borderRadius: '24px',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--accent-blue)" />
                  <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-blue)' }}>
                    Match Random Online Friend
                  </span>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#22c55e',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  Online Now
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'opacity 0.2s ease',
                opacity: isSpinning ? 0.3 : 1
              }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={randomMatch.avatar}
                    alt={randomMatch.name}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg-card)' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                      {randomMatch.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', margin: '2px 0 0 0' }}>
                    @{randomMatch.username}
                  </p>
                  {randomMatch.statusNote && (
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-blue)', display: 'inline-block', marginTop: '3px' }}>
                      ⚡ {randomMatch.statusNote}
                    </span>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                {randomMatch.bio}
              </p>

              {/* Interest Badges */}
              {randomMatch.interests && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {randomMatch.interests.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Match Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => startConversationWithUser(randomMatch)}
                  className="pill active"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={15} />
                  <span>Say Hi! 👋</span>
                </button>

                <button
                  onClick={() => toggleFollow(randomMatch.username)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '16px',
                    backgroundColor: followedUsers.includes(randomMatch.username) ? 'var(--bg-secondary)' : 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {followedUsers.includes(randomMatch.username) ? (
                    <>
                      <Check size={15} color="#22c55e" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} />
                      <span>Add Friend</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePickNextRandom}
                  disabled={isSpinning}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                  title="Spin Next Random Friend"
                >
                  <Shuffle size={15} className={isSpinning ? "animate-spin" : ""} />
                  <span>Next 🎲</span>
                </button>
              </div>
            </div>
          )}

          {/* Interest Filter Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)' }}>
              Explore Online Friends ({filteredOnlineUsers.length})
            </div>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
              {['All', 'Tech', 'AI', 'Music', 'React', 'Design', 'Trading'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setInterestFilter(cat)}
                  className={`pill ${interestFilter === cat ? 'active' : ''}`}
                  style={{ padding: '5px 12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Online Friends List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredOnlineUsers.length > 0 ? (
              filteredOnlineUsers.map(userItem => {
                const isFollowing = followedUsers.includes(userItem.username);

                return (
                  <div
                    key={userItem.id}
                    onClick={() => viewUserProfile(userItem)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <img
                          src={userItem.avatar}
                          alt={userItem.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{
                          position: 'absolute',
                          bottom: '1px',
                          right: '1px',
                          width: '11px',
                          height: '11px',
                          borderRadius: '50%',
                          backgroundColor: '#22c55e',
                          border: '2px solid var(--bg-card)'
                        }} />
                      </div>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {userItem.name}
                          </h4>
                          {userItem.statusNote && (
                            <span style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: '700', backgroundColor: 'var(--bg-secondary)', padding: '1px 6px', borderRadius: '8px', whiteSpace: 'nowrap' }}>
                              {userItem.statusNote}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '1px 0 0 0' }}>
                          @{userItem.username}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {userItem.bio}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Add Friend & Message */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollow(userItem.username);
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '14px',
                          backgroundColor: isFollowing ? 'var(--bg-secondary)' : 'var(--accent-blue)',
                          color: isFollowing ? 'var(--text-primary)' : '#ffffff',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {isFollowing ? (
                          <>
                            <Check size={13} color="#22c55e" />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <UserPlus size={13} />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startConversationWithUser(userItem);
                        }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '14px',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer'
                        }}
                        title="Send Message"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
                No online friends found matching "{searchQuery}".
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default MessagesView;

