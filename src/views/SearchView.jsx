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

export const SearchView = () => {
  const {
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
    inputRef.current?.focus();
  }, []);

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

  const handleJoinVoiceSpace = (room) => {
    setActiveVoiceRoom(room);
    setActiveTab('voice');
  };

  const handleOpenUserProfile = (person) => {
    viewUserProfile(person);
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
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px 16px 32px 16px',
        maxWidth: '620px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Top Title & Subtitle */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.4px', color: 'var(--text-primary)', margin: 0 }}>
          Search Kuyil
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '2px 0 0 0' }}>
          Discover profiles, add friends, join voice spaces & listen to music
        </p>
      </div>

      {/* Main Search Input Bar */}
      <div style={{ position: 'relative' }}>
        <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '13px' }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search profiles, voice spaces & music..."
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            paddingLeft: '44px',
            paddingRight: '38px',
            paddingTop: '11px',
            paddingBottom: '11px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-sm)',
            outline: 'none'
          }}
        />
        {query.length > 0 && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '11px',
              color: 'var(--text-muted)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
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
              fontSize: '13px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Results Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* People Section */}
        {(activeSearchTab === 'all' || activeSearchTab === 'people') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} color="var(--accent-blue)" />
              <span>People & Friends</span>
            </div>

            {filteredPeople.length === 0 ? (
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-muted)' }}>
                No profiles match "{query}".
              </div>
            ) : (
              filteredPeople.map(person => {
                const isFollowing = followedUsers.includes(person.username);

                return (
                  <div
                    key={person.id}
                    onClick={() => handleOpenUserProfile(person)}
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
                      <img
                        src={person.avatar}
                        alt={person.name}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {person.name}
                        </h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '1px 0 0 0' }}>
                          @{person.username}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '3px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-muted)' }}>
                No live voice spaces match "{query}".
              </div>
            ) : (
              filteredVoiceSpaces.map(room => (
                <div
                  key={room.id}
                  onClick={() => handleJoinVoiceSpace(room)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '20px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)', padding: '3px 10px', borderRadius: '8px' }}>
                      {room.topic}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                      {room.listenerCount} listening
                    </span>
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
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
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid var(--bg-card)',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-muted)' }}>
                <Loader2 size={16} className="animate-spin" />
                <span>Searching YouTube Music...</span>
              </div>
            ) : ytResults.length === 0 ? (
              <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '13px', color: 'var(--text-muted)' }}>
                {query.trim() ? "No music tracks found." : "Type a song name above to search YouTube music."}
              </div>
            ) : (
              ytResults.map(t => (
                <div
                  key={t.id}
                  onClick={() => handlePlayYtTrack(t)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                    <img 
                      src={t.cover || `https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`} 
                      alt={t.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`;
                      }}
                      style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} 
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                        {t.title}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: '2px 0 0 0' }}>
                        {t.artist}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <button
                      onClick={() => handlePlayYtTrack(t)}
                      className="pill active"
                      style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', cursor: 'pointer' }}
                      title="Play Song"
                    >
                      <Play size={12} fill="currentColor" />
                      <span>Play</span>
                    </button>
                    <button
                      onClick={(e) => handleAddYtQueue(e, t)}
                      style={{ padding: '6px 10px', borderRadius: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
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
  );
};
