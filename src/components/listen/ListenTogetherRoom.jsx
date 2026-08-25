import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Headphones,
  Users,
  X,
  Send,
  Plus,
  UserPlus,
  Share2,
  Check,
  Search,
  ArrowLeft
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useRealtimeSession } from "../../lib/realtime-store";
import { FloatingReactions } from "./FloatingReactions";
import { QueueManager } from "./QueueManager";
import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer";
import { MOCK_TRACKS } from "../../lib/music-provider";

const SUGGESTED_PARTNERS = [
  { id: "u2", name: "Priyanka S", username: "priyanka.s_p_", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: "u3", name: "Luna Trader", username: "lunaxtrader", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
  { id: "u4", name: "Tivss", username: "heyitsme.tivss", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: "u5", name: "Classy Queen", username: "its_classy_queen_43", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150" },
  { id: "u6", name: "Boleh Bromy", username: "bolehbromy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: "u7", name: "Ashwa", username: "im.ashwaaa", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
];

export const ListenTogetherRoom = ({ onClose }) => {
  const { setActiveTab } = useApp();
  const {
    session,
    playTrack,
    togglePlayPause,
    seek,
    nextTrack,
    prevTrack,
    addToQueue,
    removeFromQueue,
    sendReaction,
    sendChatMessage,
    addParticipant,
    removeParticipant
  } = useRealtimeSession();
  const [activeRoomTab, setActiveRoomTab] = useState("queue");
  const [chatInput, setChatInput] = useState("");
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  const [partnerSearchQuery, setPartnerSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const playback = session.playbackState;
  const currentTrack = playback.currentTrack || MOCK_TRACKS[0];
  const duration = currentTrack.duration || 240;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeekChange = (e) => {
    const newPos = parseFloat(e.target.value);
    seek(newPos);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput("");
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://vibespace.app/room/${session.roomCode}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyRoomCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(session.roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const filteredPartners = SUGGESTED_PARTNERS.filter(
    (p) =>
      p.name.toLowerCase().includes(partnerSearchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(partnerSearchQuery.toLowerCase())
  );

  return (
    <div 
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 14px',
        gap: '12px',
        position: 'relative'
      }}
    >
      {/* Floating Animated Emojis Overlay */}
      <FloatingReactions reactions={session.currentReactions} />

      {/* Sleek Compact Header: Title + Inline Avatars + Invite Partner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.4px', color: 'var(--text-primary)', margin: 0 }}>
            Listen Together
          </h1>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', margin: '2px 0 0 0' }}>
            Synchronized live music
          </p>
        </div>

        {/* Compact Inline Avatar Stack + Invite Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {session.participants.slice(0, 3).map((p, idx) => (
              <div 
                key={p.id || idx}
                title={`${p.name} (@${p.username})`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '2px solid var(--bg-primary)',
                  marginLeft: idx === 0 ? 0 : '-12px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-secondary)',
                  boxShadow: 'var(--shadow-sm)',
                  zIndex: 10 - idx
                }}
              >
                <img src={p.avatar} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsAddPartnerModalOpen(true)}
            title="Invite Partner to Listen Together"
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--accent-text)',
              border: 'none',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Plus size={14} strokeWidth={2.8} />
            <span>Invite</span>
          </button>

          {onClose && (
            <button onClick={onClose} style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: 'none', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Compact Unified Player Card */}
      <div 
        style={{ 
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '14px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* YouTube Search Input */}
        <YouTubeAudioPlayer />

        {/* Horizontal Compact Player Layout: Left Artwork (105px x 105px), Right Info & Controls */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {/* Artwork Thumbnail */}
          <div 
            style={{ 
              position: 'relative', 
              width: '105px', 
              height: '105px', 
              borderRadius: '14px', 
              overflow: 'hidden', 
              flexShrink: 0, 
              boxShadow: 'var(--shadow-md)', 
              backgroundColor: '#000',
              border: '1px solid var(--border-color)'
            }}
          >
            <img 
              src={currentTrack.coverArt || `https://img.youtube.com/vi/${currentTrack.id || 'GqlGdhjEXNg'}/hqdefault.jpg`} 
              alt={currentTrack.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <span 
              style={{ 
                position: 'absolute', 
                bottom: '6px', 
                left: '6px', 
                padding: '2px 6px', 
                borderRadius: '6px', 
                backgroundColor: 'rgba(0,0,0,0.75)', 
                backdropFilter: 'blur(4px)',
                color: '#fff', 
                fontSize: '9px', 
                fontWeight: '800', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#ef4444' }} /> LIVE
            </span>
          </div>

          {/* Player Info, Progress Scrubber & Controls */}
          <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', margin: 0 }}>
                {currentTrack.title}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', margin: '2px 0 0 0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {currentTrack.artist}
              </p>
            </div>

            {/* Audio Scrubber */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <input
                type="range"
                min="0"
                max={duration}
                value={playback.currentPosition || 0}
                onChange={handleSeekChange}
                style={{ width: '100%', cursor: 'pointer', height: '4px', accentColor: 'var(--accent-color)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>
                <span>{formatTime(playback.currentPosition || 0)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
              <button 
                onClick={() => prevTrack()} 
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
                title="Previous track"
              >
                <SkipBack size={14} />
              </button>

              <button 
                onClick={() => togglePlayPause()} 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--accent-color)', 
                  color: 'var(--accent-text)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  border: 'none'
                }}
                title={playback.isPlaying ? "Pause" : "Play"}
              >
                {playback.isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" style={{ transform: 'translateX(1px)' }} />
                )}
              </button>

              <button 
                onClick={() => nextTrack()} 
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
                title="Next track"
              >
                <SkipForward size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Queue & Chat Column Section */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            padding: '8px 0'
          }}
        >
          {/* Pill Navigation Tabs matching Activity View */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <button
              onClick={() => setActiveRoomTab("queue")}
              className={`pill ${activeRoomTab === "queue" ? "active" : ""}`}
              style={{ flex: 1, justifyContent: 'center', padding: '8px 0', fontSize: '13px', fontWeight: '700' }}
            >
              Queue ({session.queue.length})
            </button>
            <button
              onClick={() => setActiveRoomTab("chat")}
              className={`pill ${activeRoomTab === "chat" ? "active" : ""}`}
              style={{ flex: 1, justifyContent: 'center', padding: '8px 0', fontSize: '13px', fontWeight: '700' }}
            >
              Chat ({session.liveChat.length})
            </button>
          </div>

          {activeRoomTab === "queue" ? (
            <QueueManager
              queue={session.queue}
              currentUser={session.host}
              onRemoveTrackFromQueue={(id) => removeFromQueue(id)}
              onAddTrackToQueue={(t) => addToQueue(t)}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px', minHeight: '200px' }}>
                {session.liveChat.map((msg) => (
                  <div 
                    key={msg.id}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: msg.system ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      fontSize: '13px',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {!msg.system && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        <span>{msg.author.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontSize: '11px' }}>{msg.time}</span>
                      </div>
                    )}
                    <div style={{ color: msg.system ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{msg.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '4px' }}>
                <input 
                  type="text"
                  placeholder="Chat with listeners..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '13px'
                  }}
                />
                <button type="submit" className="pill active" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </div>

      {/* Add Listen Together Partner Modal */}
      {isAddPartnerModalOpen && (
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
          <div 
            className="animate-slide-up"
            style={{
              backgroundColor: 'var(--bg-card)',
              width: '100%',
              maxWidth: '440px',
              borderRadius: '24px',
              padding: '20px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={20} color="var(--text-primary)" />
                <span>Add Listen Together Partner</span>
              </h3>
              <button onClick={() => setIsAddPartnerModalOpen(false)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Room Code Share Box */}
            <div style={{
              padding: '12px 14px',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Room Code</div>
                <div style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'monospace', color: 'var(--text-primary)' }}>{session.roomCode}</div>
              </div>
              <button
                onClick={handleCopyLink}
                className="pill active"
                style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copiedLink ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px', pointerEvents: 'none' }} />
              <input 
                type="text"
                placeholder="Search partners by name or @username..."
                value={partnerSearchQuery}
                onChange={(e) => setPartnerSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  paddingLeft: '40px',
                  paddingRight: '14px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Suggested Partners List */}
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Friends & Followers
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
              {filteredPartners.map(p => {
                const isListening = session.participants.some(pt => pt.id === p.id || pt.username === p.username);
                return (
                  <div
                    key={p.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                        <img src={p.avatar} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid var(--bg-secondary)' }} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          @{p.username}
                        </div>
                      </div>
                    </div>

                    {isListening ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="pill" style={{ fontSize: '11px', padding: '4px 10px', backgroundColor: 'var(--bg-card)', color: '#22c55e', border: '1px solid var(--border-color)', fontWeight: '700' }}>
                          Listening 🎧
                        </span>
                        {p.id !== session.host.id && (
                          <button
                            onClick={() => removeParticipant(p.id)}
                            style={{ padding: '6px 8px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '11px' }}
                            title="Remove partner"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => addParticipant(p)}
                        className="pill active"
                        style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Plus size={14} />
                        <span>Add Partner</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
