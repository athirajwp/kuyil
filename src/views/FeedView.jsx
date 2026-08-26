import React from 'react';
import { Headphones, Radio, Send, Search, Users, Sparkles, Play, ChevronRight, MessageSquare, Compass, Music, Shuffle, Flame } from 'lucide-react';
import { useApp, COMMUNITIES } from '../context/AppContext';
import { useRealtimeSession } from '../lib/realtime-store';

const FEATURED_VOICE_SPACES = [
  {
    id: 'room-1',
    title: 'Late Night Tech & AI Vibes 🎙️',
    topic: 'Tech & AI',
    listenerCount: 142,
    speakers: [
      { name: 'Athi Raj', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
      { name: 'Priyanka S', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { name: 'Tech Reader', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
    ]
  },
  {
    id: 'room-2',
    title: 'Indie Music & Acoustic Jam 🎸',
    topic: 'Music & Jam',
    listenerCount: 89,
    speakers: [
      { name: 'Luna Trader', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
      { name: 'Boleh Bromy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
    ]
  }
];

export const FeedView = () => {
  const {
    user,
    setActiveTab,
    onlineUsers,
    setActiveVoiceRoom,
    startConversationWithUser,
    triggerKuyilFlight
  } = useApp();

  const { currentTrack, isPlaying, togglePlay, playTrack } = useRealtimeSession();

  const handleFeaturedPlay = () => {
    if (currentTrack) {
      togglePlay();
    } else {
      // Play default featured track
      playTrack({
        id: 'L0MK7qz13bU',
        title: 'Lofi Hip Hop Beats - Chill Study Music 🎧',
        artist: 'Lofi Girl',
        album: 'YouTube Live',
        coverArt: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
        duration: 240,
        audioUrl: 'https://www.youtube-nocookie.com/embed/L0MK7qz13bU'
      });
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 16px 36px 16px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
      
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.15) 0%, rgba(139, 92, 246, 0.18) 100%)',
        borderRadius: '24px',
        padding: '20px',
        border: '1px solid rgba(24, 119, 242, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-blue)' }}
          />
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.4px' }}>
              Welcome to Kuyil ✨
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0', fontWeight: '500' }}>
              Explore live music, voice spaces & online friends
            </p>
          </div>
        </div>

        <button
          onClick={triggerKuyilFlight}
          style={{
            padding: '8px 14px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-blue)',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0
          }}
          title="Fly Kuyil Bird Animation"
        >
          <Sparkles size={14} />
          <span>Vibe</span>
        </button>
      </div>

      {/* QUICK LAUNCHPAD GRID (4 Core Features) */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '10px' }}>
          App Features & Launchpad
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {/* Card 1: Listen Together Music */}
          <div
            onClick={() => setActiveTab('listen')}
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: 'rgba(24, 119, 242, 0.12)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Headphones size={22} />
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Listen Together
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                Stream YouTube music & sync audio in real-time
              </p>
            </div>
          </div>

          {/* Card 2: Voice Spaces */}
          <div
            onClick={() => setActiveTab('voice')}
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radio size={22} />
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Voice Spaces
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                Drop into live podcast & acoustic audio rooms
              </p>
            </div>
          </div>

          {/* Card 3: Inbox & Friend Finder */}
          <div
            onClick={() => setActiveTab('messages')}
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={20} style={{ transform: 'rotate(-20deg)' }} />
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Messages & Friends
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                Direct chat & random online friend matcher
              </p>
            </div>
          </div>

          {/* Card 4: Global Search */}
          <div
            onClick={() => setActiveTab('search')}
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '14px', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={22} />
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Search & Discover
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                Search YouTube music tracks, people & spaces
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED LISTEN TOGETHER MUSIC WIDGET */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '20px',
        padding: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
          <img
            src={currentTrack?.coverArt || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80'}
            alt="Track"
            style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '0.5px' }}>
              🎧 Listen Together Spot
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentTrack?.title || 'Lofi Hip Hop Beats - Chill Study Music'}
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '1px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentTrack?.artist || 'Lofi Girl • 142 listening together'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={handleFeaturedPlay}
            className="pill active"
            style={{ padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', border: 'none' }}
          >
            <Play size={14} fill="currentColor" />
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>

      {/* LIVE VOICE SPACES SPOTLIGHT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio size={15} color="#22c55e" />
            <span>Live Voice Rooms Right Now</span>
          </div>
          <button 
            onClick={() => setActiveTab('voice')}
            style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue)', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            View All →
          </button>
        </div>

        {FEATURED_VOICE_SPACES.map(room => (
          <div
            key={room.id}
            onClick={() => {
              setActiveVoiceRoom(room);
              setActiveTab('voice');
            }}
            style={{
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '6px' }}>
                  {room.topic}
                </span>
                <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                  {room.listenerCount} live
                </span>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {room.title}
              </h4>
            </div>

            <button
              className="pill active"
              style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}
            >
              <span>Drop in</span>
              <ChevronRight size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* ONLINE FRIENDS & QUICK MATCHER WIDGET */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={15} color="var(--accent-blue)" />
            <span>Online Friends ({onlineUsers.length})</span>
          </div>
          <button 
            onClick={() => setActiveTab('messages')}
            style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-blue)', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Find Random Match 🎲
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'none' }}>
          {onlineUsers.map(onlineUser => (
            <div
              key={onlineUser.id}
              onClick={() => startConversationWithUser(onlineUser)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 12px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                minWidth: '85px',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={onlineUser.avatar}
                  alt={onlineUser.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  border: '2px solid var(--bg-card)'
                }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', textAlign: 'center', width: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {onlineUser.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FeedView;

