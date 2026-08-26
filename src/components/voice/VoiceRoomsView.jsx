import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Hand,
  Volume2,
  Users,
  Radio,
  Plus,
  X,
  Share2,
  Sparkles,
  MessageSquare,
  Globe,
  Lock,
  ChevronRight,
  Zap,
  Check,
  Flame,
  Heart,
  Smile,
  Send,
  Terminal,
  Command,
  ChevronDown,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Mock Live Audio Rooms Data
const MOCK_ROOMS = [
  {
    id: 'room-1',
    title: 'Late Night Tech & AI Vibes 🎙️',
    topic: 'Tech & AI',
    isLive: true,
    speakerCount: 4,
    listenerCount: 142,
    speakers: [
      { id: 's1', name: 'Athi Raj', username: 'athiraj.kp', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', isSpeaking: true, isMuted: false, role: 'Host' },
      { id: 's2', name: 'Priyanka S', username: 'priyanka.s_p_', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', isSpeaking: false, isMuted: false, role: 'Speaker' },
      { id: 's3', name: 'Tech Reader', username: 'techrader71', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', isSpeaking: true, isMuted: false, role: 'Speaker' },
      { id: 's4', name: 'Eli Tech', username: 'eli.tech9', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', isSpeaking: false, isMuted: true, role: 'Speaker' },
    ],
    listeners: [
      { id: 'l1', name: 'Luna Trader', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
      { id: 'l2', name: 'Classy Queen', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' },
      { id: 'l3', name: 'Boleh Bromy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 'l4', name: 'Ashwa', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }
    ]
  },
  {
    id: 'room-2',
    title: 'Indie Music & Acoustic Jam 🎸',
    topic: 'Music & Jam',
    isLive: true,
    speakerCount: 3,
    listenerCount: 89,
    speakers: [
      { id: 's5', name: 'Luna Trader', username: 'lunaxtrader', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', isSpeaking: true, isMuted: false, role: 'Host' },
      { id: 's6', name: 'Boleh Bromy', username: 'bolehbromy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', isSpeaking: false, isMuted: false, role: 'Speaker' },
      { id: 's7', name: 'Ashwa', username: 'im.ashwaaa', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', isSpeaking: false, isMuted: true, role: 'Speaker' }
    ],
    listeners: [
      { id: 'l5', name: 'Priyanka S', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { id: 'l6', name: 'Tech Reader', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
    ]
  },
  {
    id: 'room-3',
    title: 'Solo Founders & Startup Pitch 🚀',
    topic: 'Business',
    isLive: true,
    speakerCount: 5,
    listenerCount: 210,
    speakers: [
      { id: 's8', name: 'Tech Reader', username: 'techrader71', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', isSpeaking: true, isMuted: false, role: 'Host' },
      { id: 's9', name: 'Athi Raj', username: 'athiraj.kp', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', isSpeaking: false, isMuted: false, role: 'Speaker' },
    ],
    listeners: [
      { id: 'l7', name: 'Eli Tech', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' }
    ]
  }
];

const VoiceRoomsViewContent = () => {
  const {
    user,
    viewUserProfile,
    activeVoiceRoom: activeRoom,
    setActiveVoiceRoom: setActiveRoom,
    isVoiceRoomMinimized,
    setIsVoiceRoomMinimized,
    isMicOn,
    setIsMicOn,
    isHandRaised,
    setIsHandRaised
  } = useApp();
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomTopic, setNewRoomTopic] = useState('General');
  const [reactions, setReactions] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [speakerWave, setSpeakerWave] = useState(1);

  // Group Chat & Commands state
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', user: { name: 'Priyanka S', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }, text: 'Super excited for today\'s live space! 🔥', time: '2m ago' },
    { id: 'm2', user: { name: 'Tech Reader', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }, text: 'Use /hand to request microphone access 🎙️', time: '1m ago' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showCommandsMenu, setShowCommandsMenu] = useState(false);

  // Targeted Emoji & Chat Pop-up Modal State
  const [showChatModal, setShowChatModal] = useState(false);
  const [showTargetedModal, setShowTargetedModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState('🔥');

  const chatEndRef = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 50) {
      setIsVoiceRoomMinimized(true);
    }
    touchStartY.current = null;
  };

  useEffect(() => {
    if (showChatModal) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showChatModal]);

  const COMMAND_LIST = [
    { cmd: '/hand', desc: 'Raise hand to speak ✋' },
    { cmd: '/mute', desc: 'Toggle mic 🎙️' },
    { cmd: '/music', desc: 'Play background music 🎵' },
    { cmd: '/poll', desc: 'Start audience poll 📊' },
    { cmd: '/topic', desc: 'Change room topic 📝' },
    { cmd: '/clear', desc: 'Clear group chat 🧹' }
  ];

  // Simulated Speaking Wave Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeakerWave(prev => (prev >= 3 ? 1 : prev + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleSendTargetedEmoji = () => {
    if (!selectedPerson) return;
    handleSendReaction(selectedEmoji);
    setChatMessages(prev => [...prev, {
      id: `targeted-${Date.now()}`,
      user: { name: user.name, avatar: user.avatar },
      text: `${selectedEmoji} Sent reaction to @${selectedPerson.name}!`,
      time: 'Just now',
      isSystem: true
    }]);
    setShowTargetedModal(false);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const trimmed = inputMessage.trim();

    if (trimmed.startsWith('/')) {
      if (trimmed === '/hand' || trimmed === '/raise') {
        setIsHandRaised(true);
        setChatMessages(prev => [...prev, {
          id: `cmd-${Date.now()}`,
          user: { name: 'System Bot 🤖', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150' },
          text: `✋ @${user.username} raised their hand to speak!`,
          time: 'Just now',
          isSystem: true
        }]);
      } else if (trimmed === '/mute' || trimmed === '/unmute') {
        setIsMicOn(prev => !prev);
      } else if (trimmed === '/clear') {
        setChatMessages([]);
      } else {
        setChatMessages(prev => [...prev, {
          id: `cmd-${Date.now()}`,
          user: { name: 'Command Bot 🤖', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150' },
          text: `⚡ Command executed: ${trimmed}`,
          time: 'Just now',
          isSystem: true
        }]);
      }
      setInputMessage('');
      setShowCommandsMenu(false);
      return;
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      user: { name: user.name, avatar: user.avatar },
      text: trimmed,
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');
    setShowCommandsMenu(false);
  };

  // Quick Join Random Voice Room
  const handleJoinRandomRoom = () => {
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    setActiveRoom(randomRoom);
    setIsVoiceRoomMinimized(false);
  };

  const handleJoinRoom = (room) => {
    setActiveRoom(room);
    setIsVoiceRoomMinimized(false);
  };

  const handleLeaveRoom = () => {
    setActiveRoom(null);
    setIsVoiceRoomMinimized(false);
    setIsMicOn(false);
    setIsHandRaised(false);
  };

  const handleToggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const handleToggleHand = () => {
    setIsHandRaised(!isHandRaised);
  };

  const handleSendReaction = (emoji) => {
    const newId = Date.now() + Math.random();
    setReactions(prev => [...prev, { id: newId, emoji, x: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newId));
    }, 2000);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!newRoomTitle.trim()) return;

    const createdRoom = {
      id: `room-${Date.now()}`,
      title: newRoomTitle,
      topic: newRoomTopic,
      isLive: true,
      speakerCount: 1,
      listenerCount: 1,
      speakers: [
        {
          id: `user-${Date.now()}`,
          name: user.name,
          username: user.username,
          avatar: user.avatar,
          isSpeaking: true,
          isMuted: false,
          role: 'Host'
        }
      ],
      listeners: []
    };

    setRooms([createdRoom, ...rooms]);
    setActiveRoom(createdRoom);
    setIsVoiceRoomMinimized(false);
    setIsCreateModalOpen(false);
    setNewRoomTitle('');
  };
  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isFullRoomActive = activeRoom && !isVoiceRoomMinimized;
  const activeSpeakers = Array.isArray(activeRoom?.speakers) ? activeRoom.speakers : [];
  const activeListeners = Array.isArray(activeRoom?.listeners) ? activeRoom.listeners : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 16px 24px 16px' }}>
      {/* Top Header Section (Visible when not in full room view) */}
      {!isFullRoomActive && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.4px', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={20} color="var(--accent-blue)" />
                <span>Voice Spaces</span>
              </h1>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', margin: '2px 0 0 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Drop-in live group audio chats & discussions
              </p>
            </div>

            {/* Start New Space Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="pill active"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '20px',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Plus size={14} strokeWidth={2.8} />
              <span>Start Space</span>
            </button>
          </div>

        </div>
      )}

      {/* Active Room View Overlay if inside a Room */}
      {isFullRoomActive ? (
        <div
          className="animate-fade-in"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            padding: '8px 0 24px 0',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative',
            minHeight: 'calc(100vh - 150px)',
            touchAction: 'pan-y'
          }}
        >
          {/* Top Center Clubhouse Downward Arrow Minimizer & Handle Bar */}
          <div
            onClick={() => setIsVoiceRoomMinimized(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '2px 0',
              marginTop: '-4px',
              marginBottom: '2px'
            }}
            title="Minimize room (Tap arrow or swipe down)"
          >
            <button
              onClick={() => setIsVoiceRoomMinimized(true)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-secondary, #f0f2f5)',
                color: 'var(--text-primary, #050505)',
                border: '1px solid var(--border-color, #e4e6eb)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s ease'
              }}
            >
              <ChevronDown size={22} />
            </button>
            <div
              style={{
                width: '36px',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: 'var(--border-color, #e4e6eb)',
                marginTop: '4px'
              }}
            />
          </div>

          {/* Floating Emoji Reactions Layer */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
            {reactions.map(r => (
              <div
                key={r.id}
                style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: `${r.x}%`,
                  fontSize: '28px',
                  animation: 'floatUp 2s ease-out forwards'
                }}
              >
                {r.emoji}
              </div>
            ))}
          </div>

          {/* Room Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', padding: '0 4px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="pill" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: '11px', fontWeight: '800', padding: '3px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                  LIVE STAGE
                </span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>
                  {activeRoom?.topic || 'General'}
                </span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                {activeRoom?.title || 'Voice Space'}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {/* Leave Quietly Button */}
              <button
                onClick={handleLeaveRoom}
                className="pill"
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>✌️</span>
                <span>Leave quietly</span>
              </button>
            </div>
          </div>

          {/* Speakers Stage Section */}
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 14px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Speakers ({activeSpeakers.length})
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 10px' }}>
              {activeSpeakers.map((spk) => {
                const isUser = spk.username === user?.username;
                const speaking = isUser ? isMicOn : spk.isSpeaking;

                return (
                  <div
                    key={spk.id}
                    onClick={() => viewUserProfile(spk)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ position: 'relative', width: '52px', height: '52px' }}>
                      {/* Animated Glowing Audio Wave Ring when Speaking */}
                      {speaking && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: '-4px',
                            borderRadius: '50%',
                            border: `2.5px solid var(--accent-blue)`,
                            opacity: speakerWave === 1 ? 0.4 : speakerWave === 2 ? 0.8 : 1,
                            transform: `scale(${1 + speakerWave * 0.04})`,
                            transition: 'all 0.3s ease'
                          }}
                        />
                      )}

                      <img
                        src={spk?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                        alt={spk?.name || "User"}
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: speaking ? '2.5px solid var(--accent-blue)' : '2px solid var(--bg-secondary)'
                        }}
                      />

                      {/* Mute/Mic Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          right: '-1px',
                          width: '17px',
                          height: '17px',
                          borderRadius: '50%',
                          backgroundColor: spk?.isMuted && !isUser ? '#ef4444' : 'var(--bg-card)',
                          color: spk?.isMuted && !isUser ? '#fff' : 'var(--text-primary)',
                          border: '1.5px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        {spk?.isMuted && !isUser ? <MicOff size={10} /> : <Mic size={10} color="#22c55e" />}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', width: '100%', padding: '0 2px' }}>
                      <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {spk?.name || "User"}
                      </div>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {spk?.role || "Speaker"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Listeners Section matching Speakers layout */}
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 14px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Listeners ({activeRoom?.listenerCount || activeListeners.length})
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 10px' }}>
              {activeListeners.map((lst) => (
                <div
                  key={lst?.id || Math.random()}
                  onClick={() => viewUserProfile(lst)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'relative', width: '52px', height: '52px' }}>
                    <img
                      src={lst?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={lst?.name || "Listener"}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--bg-secondary)'
                      }}
                    />
                  </div>

                  <div style={{ textAlign: 'center', width: '100%', padding: '0 2px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lst?.name || "Listener"}
                    </div>
                    <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
                      Listener
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Live Voice Rooms Feed */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(selectedTopic === 'All' ? rooms : rooms.filter(r => r.topic === selectedTopic)).map((room) => (
            <div
              key={room.id}
              onClick={() => handleJoinRoom(room)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '14px 16px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                userSelect: 'none'
              }}
            >
              {/* Header: Topic Tag & Live Listener Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    letterSpacing: '0.2px'
                  }}
                >
                  {room.topic}
                </span>

                <span style={{ fontSize: '11px', fontWeight: '700', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                  {room.listenerCount} listening
                </span>
              </div>

              {/* Room Title */}
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.25', margin: 0 }}>
                {room.title}
              </h3>

              {/* Clubhouse-Style Middle Row: First 5 Avatars (+ count if > 5) on Left, Drop In on Right */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                  {/* Overlapping Avatars (First 5) */}
                  <div style={{ display: 'flex', flexShrink: 0 }}>
                    {(room.speakers || []).slice(0, 5).map((spk, i) => (
                      <img
                        key={spk.id || i}
                        src={spk.avatar}
                        alt={spk.name}
                        title={spk.name}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          border: '2px solid var(--bg-card)',
                          marginLeft: i > 0 ? '-10px' : 0,
                          objectFit: 'cover',
                          boxShadow: 'var(--shadow-xs)'
                        }}
                      />
                    ))}

                    {/* Remaining Speakers Count Badge if > 5 */}
                    {(room.speakers || []).length > 5 && (
                      <div
                        title={`${(room.speakers || []).length - 5} more speakers`}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '2px solid var(--bg-card)',
                          marginLeft: '-10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '800',
                          color: 'var(--text-primary)',
                          boxShadow: 'var(--shadow-xs)'
                        }}
                      >
                        +{(room.speakers || []).length - 5}
                      </div>
                    )}
                  </div>
                </div>

                {/* Drop In Action Pill */}
                <button
                  className="pill active"
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    border: 'none',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <span>Drop in</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Start New Voice Space Modal */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 100
          }}
        >
          <form
            onSubmit={handleCreateRoom}
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-card)',
              width: '100%',
              maxWidth: '440px',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={22} color="var(--accent-blue)" />
                <span>Start a Voice Space</span>
              </h3>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Space Topic</label>
              <input
                type="text"
                required
                placeholder="What do you want to talk about?"
                value={newRoomTitle}
                onChange={(e) => setNewRoomTitle(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category</label>
              <select
                value={newRoomTopic}
                onChange={(e) => setNewRoomTopic(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="Tech & AI">Tech & AI</option>
                <option value="Music & Jam">Music & Jam</option>
                <option value="Business">Business</option>
                <option value="General">General Chill</option>
              </select>
            </div>

            <button
              type="submit"
              className="pill active"
              style={{
                width: '100%',
                padding: '12px 0',
                fontSize: '15px',
                fontWeight: '700',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Radio size={18} />
              <span>Start Live Space Now</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Always-Visible Preview of Last 2 Chat Messages (Right Staggered Tier) */}
      {isFullRoomActive && !showChatModal && chatMessages.length > 0 && (
        <div
          onClick={() => {
            setShowTargetedModal(false);
            setShowChatModal(true);
          }}
          className="animate-slide-up"
          style={{
            position: 'fixed',
            bottom: '76px',
            right: 'max(16px, calc((100vw - 620px) / 2 + 16px))',
            zIndex: 44,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            maxWidth: 'min(170px, calc(100vw - 180px))',
            cursor: 'pointer'
          }}
          title="Click to expand full live chat"
        >
          {chatMessages.slice(-2).map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--bg-glass, rgba(255, 255, 255, 0.95))',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '5px 9px',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <img
                src={msg?.user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt={msg?.user?.name || "User"}
                style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg?.user?.name || "User"}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg?.text || ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Circular Widget Shortcuts fixed at bottom left (Mic, Target Specific Person Emoji, Chat) */}
      {isFullRoomActive && (
        <div
          style={{
            position: 'fixed',
            bottom: '76px',
            left: 'max(16px, calc((100vw - 620px) / 2 + 16px))',
            zIndex: 45,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: 'var(--bg-card, #ffffff)',
            padding: '5px 7px',
            borderRadius: '30px',
            border: '1.5px solid var(--border-dark, #cbd5e1)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)'
          }}
        >
          {/* 1. Floating Mic Toggle Widget Shortcut */}
          <button
            onClick={handleToggleMic}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: isMicOn ? '#22c55e' : 'var(--bg-secondary, #f1f5f9)',
              color: isMicOn ? '#ffffff' : 'var(--text-primary, #0f172a)',
              border: isMicOn ? 'none' : '1.5px solid var(--border-color, #e2e8f0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: isMicOn ? '0 0 14px rgba(34,197,94,0.45)' : 'var(--shadow-sm)',
              transition: 'all 0.15s ease'
            }}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic size={20} strokeWidth={2.2} /> : <MicOff size={20} strokeWidth={2.2} />}
          </button>

          {/* 2. Floating Target Specific Person Emoji Reaction Widget Shortcut */}
          <button
            onClick={() => {
              if (!selectedPerson && activeSpeakers.length > 0) {
                const other = activeSpeakers.find(s => s.username !== user?.username) || activeSpeakers[0];
                setSelectedPerson(other);
              }
              setShowChatModal(false);
              setShowTargetedModal(!showTargetedModal);
            }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: showTargetedModal ? 'var(--accent-color, #000000)' : 'rgba(0, 149, 246, 0.12)',
              color: showTargetedModal ? '#ffffff' : '#0095f6',
              border: '1.5px solid rgba(0, 149, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.15s ease'
            }}
            title="Send Emoji to Specific Person"
          >
            <Smile size={20} strokeWidth={2.2} />
          </button>

          {/* 3. Floating Live Group Chat Shortcut Widget */}
          <button
            onClick={() => {
              setShowTargetedModal(false);
              setShowChatModal(!showChatModal);
            }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: showChatModal ? 'var(--accent-color, #000000)' : 'rgba(147, 51, 234, 0.12)',
              color: showChatModal ? '#ffffff' : '#9333ea',
              border: '1.5px solid rgba(147, 51, 234, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              transition: 'all 0.15s ease'
            }}
            title="Open Live Space Group Chat"
          >
            <MessageSquare size={20} strokeWidth={2.2} />
            {chatMessages.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#0095f6',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: '900',
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                {chatMessages.length}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Live Space Group Chat Pop-up Modal Card - Full Viewport Fit & Auto-Scroll */}
      {showChatModal && activeRoom && (
        <div
          className="animate-slide-up"
          style={{
            position: 'fixed',
            top: '60px',
            bottom: '68px',
            left: '12px',
            right: '12px',
            maxWidth: '580px',
            margin: '0 auto',
            zIndex: 55,
            backgroundColor: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '16px',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
              <MessageSquare size={20} color="var(--accent-blue)" />
              <span>Live Space Group Chat</span>
            </div>

            <button onClick={() => setShowChatModal(false)} style={{ color: 'var(--text-muted)', padding: '4px', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Slash Commands Dropdown */}
          {showCommandsMenu && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '14px', border: '1px solid var(--border-color)', flexShrink: 0 }}>
              {COMMAND_LIST.map((c) => (
                <button
                  key={c.cmd}
                  type="button"
                  onClick={() => {
                    setInputMessage(c.cmd + ' ');
                    setShowCommandsMenu(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-blue)' }}>{c.cmd}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{c.desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Full Height Message List with Auto-Scroll */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingRight: '4px',
              paddingTop: '4px',
              paddingBottom: '4px'
            }}
          >
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  backgroundColor: msg.isSystem ? 'rgba(59,130,246,0.08)' : 'var(--bg-primary)',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: msg.isSystem ? '1px dashed var(--accent-blue)' : '1px solid var(--border-color)'
                }}
              >
                <img src={msg?.user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt={msg?.user?.name || "User"} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', marginTop: '2px' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{msg?.user?.name || "User"}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '2px', lineHeight: '1.4' }}>{msg.text}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Form */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <input
              type="text"
              placeholder="Say something or type / for commands..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '10px 14px',
                fontSize: '14px',
                color: 'var(--text-primary)'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 18px',
                borderRadius: '16px',
                backgroundColor: 'var(--accent-color)',
                color: 'var(--accent-text)',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Target Specific Person Emoji Reaction Popover Card - Perfectly Fits Screen Left to Right */}
      {showTargetedModal && activeRoom && (
        <div
          className="animate-slide-up"
          style={{
            position: 'fixed',
            bottom: '136px',
            left: '16px',
            right: '16px',
            maxWidth: '580px',
            margin: '0 auto',
            zIndex: 55,
            backgroundColor: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '18px 20px',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
              🎯 Target Person Emoji
            </span>
            <button onClick={() => setShowTargetedModal(false)} style={{ color: 'var(--text-muted)', padding: '2px' }}>
              <X size={16} />
            </button>
          </div>

          {/* Select Specific Person */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>1. Select Person</label>
            <div className="no-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '6px', paddingBottom: '4px' }}>
              {[...activeSpeakers, ...activeListeners].map((person) => {
                const isSelected = selectedPerson?.id === person.id;
                return (
                  <button
                    key={person.id}
                    onClick={() => setSelectedPerson(person)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 8px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'rgba(59,130,246,0.15)' : 'var(--bg-secondary)',
                      border: isSelected ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      minWidth: '60px'
                    }}
                  >
                    <img src={person?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt={person?.name || "User"} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '55px' }}>
                      {person?.name ? person.name.split(' ')[0] : 'User'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Emoji */}
          <div>
            <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>2. Choose Emoji</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
              {['🔥', '❤️', '👏', '🎉', '💯', '⭐', '👑', '🎯', '💬'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '10px',
                    fontSize: '18px',
                    backgroundColor: selectedEmoji === emoji ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    border: selectedEmoji === emoji ? '1.5px solid var(--accent-blue)' : '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Send Reaction Button */}
          <button
            onClick={handleSendTargetedEmoji}
            style={{
              width: '100%',
              padding: '10px 0',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-blue)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '4px'
            }}
          >
            <span>Send {selectedEmoji} to {selectedPerson ? `@${selectedPerson.name ? selectedPerson.name.split(' ')[0] : 'User'}` : 'Person'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

class VoiceRoomsErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("VoiceRooms Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '36px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Voice Space Encountered a Temporary Error
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {this.state.error?.message || "An unexpected rendering error occurred."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="pill active"
            style={{ padding: '8px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            Refresh Voice Spaces
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const VoiceRoomsView = () => (
  <VoiceRoomsErrorBoundary>
    <VoiceRoomsViewContent />
  </VoiceRoomsErrorBoundary>
);
