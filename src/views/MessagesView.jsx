import React, { useState } from 'react';
import { Search, Edit3, Sliders, Send, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagesView = () => {
  const { conversations, activeChat, setActiveChat } = useApp();
  const [filter, setFilter] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', sender: 'other', text: 'Hey Athi! Checked out your new Vibespace app design!', time: '10:14 AM' },
    { id: 'm2', sender: 'me', text: 'Thanks! Replicated Meta Threads with React & 100% precision.', time: '10:15 AM' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages([...chatMessages, {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: messageInput,
      time: 'Just now'
    }]);
    setMessageInput('');
  };

  if (activeChat) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
        {/* Chat Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setActiveChat(null)} style={{ color: 'var(--text-primary)' }}>
            <ArrowLeft size={22} />
          </button>
          <img 
            src={activeChat.user.avatar} 
            alt={activeChat.user.name}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
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
                lineHeight: '1.4'
              }}
            >
              <div>{msg.text}</div>
              <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
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
              fontSize: '15px'
            }}
          />
          <button 
            type="submit"
            className="pill active"
            style={{ padding: '8px 16px' }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '16px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.8px', color: 'var(--text-primary)' }}>
          Messages
        </h1>
      </div>

      {/* Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'var(--bg-secondary)',
        padding: '10px 16px',
        borderRadius: '14px'
      }}>
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', fontSize: '15px', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={() => setFilter('inbox')}
          className={`pill ${filter === 'inbox' ? 'active' : ''}`}
        >
          Inbox
        </button>
        <button 
          onClick={() => setFilter('requests')}
          className={`pill ${filter === 'requests' ? 'active' : ''}`}
        >
          Requests
        </button>
      </div>

      {/* Direct Messages List or Empty State matching Screenshot 2 */}
      {conversations.length > 0 && filter === 'inbox' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
          {conversations.map(conv => (
            <div 
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
            >
              <img 
                src={conv.user.avatar} 
                alt={conv.user.name}
                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{conv.user.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{conv.time}</span>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{conv.lastMessage}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State Illustration Container matching Screenshot 2 */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '60px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '180px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
            }}>
              💬
            </div>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Keep it real in direct messages
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '280px', marginBottom: '24px' }}>
            Start a side conversation, send threads and more.
          </p>

          <button 
            onClick={() => setActiveChat(conversations[0])}
            style={{
              padding: '12px 36px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--accent-text)',
              fontWeight: '700',
              fontSize: '15px'
            }}
          >
            Message
          </button>
        </div>
      )}
    </div>
  );
};
