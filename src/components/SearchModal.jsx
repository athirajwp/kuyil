import React, { useState, useEffect, useRef } from 'react';
import { Search, X, UserPlus, Check, Radio, Play, Plus, Loader2, Users, Mic, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRealtimeSession } from '../lib/realtime-store';
import { searchYouTubeMusic } from '../lib/yt-search';

const MOCK_PEOPLE = [
  { id: 'p1', name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", bio: "Tech enthusiast & UI designer ✨ | Listening to tech podcasts", followersCount: 1420 },
  { id: 'p2', name: "Luna Trader", username: "lunaxtrader", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", bio: "Crypto & Forex trader 📈 | Chennai meetup host", followersCount: 8900 },
  { id: 'p3', name: "Tech Reader", username: "techrader71", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", bio: "Gadget reviewer & AI tinkerer 🤖 | 50k sub YouTube", followersCount: 48900 },
  { id: 'p4', name: "Eli Tech", username: "eli.tech9", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150", bio: "Building solo SaaS products 🚀 | React & Node.js", followersCount: 3200 },
  { id: 'p5', name: "Classy Queen", username: "its_classy_queen_43", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150", bio: "Tamil vibes & motivation quotes 💫 | Lifestyle vlogger", followersCount: 12400 },
  { id: 'p6', name: "Ashwa", username: "im.ashwaaa", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", bio: "Learning C & systems programming 💻 | Coffee lover", followersCount: 950 },
  { id: 'p7', name: "Boleh Bromy", username: "bolehbromy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", bio: "AI prompts developer & tech builder ⚙️", followersCount: 2100 }
];

const MOCK_VOICE_SPACES = [
  {
    id: 'room-1',
    title: 'Late Night Tech & AI Vibes 🎙️',
    topic: 'Tech & AI',
    listenerCount: 142,
    speakerCount: 4,
    speakers: [
      { id: 'spk-1', name: 'Athi Raj', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'Host' },
      { id: 'spk-2', name: 'Priyanka S', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', role: 'Speaker' },
      { id: 'spk-3', name: 'Tech Reader', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', role: 'Speaker' },
      { id: 'spk-4', name: 'Eli Tech', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', role: 'Speaker' }
    ]
  },
  {
    id: 'room-2',
    title: 'Indie Music & Acoustic Jam 🎸',
    topic: 'Music & Jam',
    listenerCount: 89,
    speakerCount: 3,
    speakers: [
      { id: 'spk-5', name: 'Luna Trader', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', role: 'Host' },
      { id: 'spk-6', name: 'Boleh Bromy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', role: 'Speaker' },
      { id: 'spk-7', name: 'Ashwa', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'Speaker' }
    ]
  },
  {
    id: 'room-3',
    title: 'Solo Founders & Startup Pitch 🚀',
    topic: 'Business',
    listenerCount: 210,
    speakerCount: 5,
    speakers: [
      { id: 'spk-8', name: 'Eli Tech', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', role: 'Host' },
      { id: 'spk-9', name: 'Athi Raj', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role: 'Speaker' }
    ]
  }
];

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    followedUsers,
    toggleFollow,
    viewUserProfile,
    setActiveVoiceRoom,
    setActiveTab
  } = useApp();
  const { playTrack, addToQueue } = useRealtimeSession();

  const [query, setQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('all'); // 'all', 'people', 'voice', 'music'
  const [ytResults, setYtResults] = useState([]);
  const [isSearchingYt, setIsSearchingYt] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setYtResults([]);
    }
  }, [isSearchOpen]);

  // YouTube Music search effect
  useEffect(() => {
    if (!query.trim()) {
      setYtResults([]);
      setIsSearchingYt(false);
      return;
    }

    setIsSearchingYt(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchYouTubeMusic(query);
        setYtResults(res || []);
      } catch (e) {
      } finally {
        setIsSearchingYt(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  // Filtering people & voice spaces locally
  const filteredPeople = MOCK_PEOPLE.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.username.toLowerCase().includes(query.toLowerCase()) ||
    p.bio.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVoiceSpaces = MOCK_VOICE_SPACES.filter(v =>
    v.title.toLowerCase().includes(query.toLowerCase()) ||
    v.topic.toLowerCase().includes(query.toLowerCase()) ||
    v.speakers.some(s => s.name.toLowerCase().includes(query.toLowerCase()))
  );

  const handleClose = () => {
    setIsSearchOpen(false);
  };

  const handleJoinVoiceSpace = (room) => {
    setActiveVoiceRoom(room);
    setActiveTab('voice');
    setIsSearchOpen(false);
  };

  const handleOpenUserProfile = (person) => {
    viewUserProfile(person);
    setIsSearchOpen(false);
  };

  const handlePlayYtTrack = (trackItem) => {
    const track = {
      id: trackItem.id,
      title: trackItem.title,
      artist: trackItem.artist || "YouTube Artist",
      album: "YouTube Music",
      coverArt: trackItem.cover || `https://i.ytimg.com/vi/${trackItem.id}/hqdefault.jpg`,
      duration: trackItem.duration || 215,
      audioUrl: `https://www.youtube-nocookie.com/embed/${trackItem.id}`,
    };
    playTrack(track);
  };

  const handleAddYtQueue = (e, trackItem) => {
    e.stopPropagation();
    const track = {
      id: trackItem.id,
      title: trackItem.title,
      artist: trackItem.artist || "YouTube Artist",
      album: "YouTube Music",
      coverArt: trackItem.cover || `https://i.ytimg.com/vi/${trackItem.id}/hqdefault.jpg`,
      duration: trackItem.duration || 215,
      audioUrl: `https://www.youtube-nocookie.com/embed/${trackItem.id}`,
    };
    addToQueue(track);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <div
        className="animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          marginTop: '20px',
          marginBottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top Search Header */}
        <div
          style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search profiles, voice spaces & music..."
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                paddingLeft: '42px',
                paddingRight: '36px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            {query.length > 0 && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  color: 'var(--text-muted)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={handleClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderBottom: '1px solid var(--border-color)', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'people', label: `People (${filteredPeople.length})` },
            { id: 'voice', label: `Voice Spaces (${filteredVoiceSpaces.length})` },
            { id: 'music', label: 'Music' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSearchTab(tab.id)}
              className={`pill ${activeSearchTab === tab.id ? 'active' : ''}`}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results Body */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '480px', overflowY: 'auto' }}>
          
          {/* People Section */}
          {(activeSearchTab === 'all' || activeSearchTab === 'people') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={14} color="var(--accent-blue)" />
                <span>People & Friends</span>
              </div>

              {filteredPeople.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0' }}>No profile matches found.</p>
              ) : (
                filteredPeople.map(person => {
                  const isFollowing = followedUsers.includes(person.username);

                  return (
                    <div
                      key={person.id}
                      onClick={() => handleOpenUserProfile(person)}
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
                          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '3px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {person.bio}
                          </p>
                        </div>
                      </div>

                      {/* Add Friend / Follow Button */}
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
                            <span>Add Friend</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Voice Spaces Section */}
          {(activeSearchTab === 'all' || activeSearchTab === 'voice') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={14} color="#22c55e" />
                <span>Live Voice Spaces</span>
              </div>

              {filteredVoiceSpaces.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0' }}>No voice spaces found.</p>
              ) : (
                filteredVoiceSpaces.map(room => (
                  <div
                    key={room.id}
                    onClick={() => handleJoinVoiceSpace(room)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-card)', padding: '3px 10px', borderRadius: '8px' }}>
                        {room.topic}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                        {room.listenerCount} listening
                      </span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                      {room.title}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {(room.speakers || []).slice(0, 4).map((spk, i) => (
                          <img
                            key={i}
                            src={spk.avatar}
                            alt={spk.name}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              border: '2px solid var(--bg-secondary)',
                              marginLeft: i > 0 ? '-8px' : 0,
                              objectFit: 'cover'
                            }}
                          />
                        ))}
                      </div>

                      <button
                        className="pill active"
                        style={{
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          borderRadius: '16px',
                          cursor: 'pointer'
                        }}
                      >
                        <span>Drop in</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* YouTube Music Section */}
          {(activeSearchTab === 'all' || activeSearchTab === 'music') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Play size={14} color="var(--accent-color)" />
                <span>YouTube Music</span>
              </div>

              {isSearchingYt ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Searching music...</span>
                </div>
              ) : ytResults.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0' }}>
                  {query.trim() ? "No music tracks found." : "Type a song name above to search music."}
                </p>
              ) : (
                ytResults.map(t => (
                  <div
                    key={t.id}
                    onClick={() => handlePlayYtTrack(t)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                      <img src={t.cover} alt={t.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                          {t.title}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: '2px 0 0 0' }}>
                          {t.artist}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <button
                        onClick={() => handlePlayYtTrack(t)}
                        className="pill active"
                        style={{ padding: '6px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', cursor: 'pointer' }}
                        title="Play Song"
                      >
                        <Play size={12} fill="currentColor" />
                        <span>Play</span>
                      </button>
                      <button
                        onClick={(e) => handleAddYtQueue(e, t)}
                        style={{ padding: '6px 10px', borderRadius: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
                        title="Add to Queue"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
