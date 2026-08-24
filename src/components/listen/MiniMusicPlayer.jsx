import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, Maximize2, Headphones } from "lucide-react";
import { useRealtimeSession } from "../../lib/realtime-store";

export const MiniMusicPlayer = ({ onOpenFullRoom }) => {
  const { session, togglePlayPause, nextTrack } = useRealtimeSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const playerRef = useRef(null);
  const playback = session.playbackState;
  const currentTrack = playback.currentTrack;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentTrack) return null;

  return (
    <div
      ref={playerRef}
      onClick={() => setIsExpanded(true)}
      style={{
        position: 'fixed',
        bottom: '72px',
        right: '16px',
        zIndex: 45,
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(16px)',
        borderRadius: isExpanded ? '20px' : '50%',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        color: 'var(--text-primary)',
        width: isExpanded ? '320px' : '52px',
        height: isExpanded ? '68px' : '52px',
        padding: isExpanded ? '10px 14px' : '4px'
      }}
    >
      {!isExpanded ? (
        <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={currentTrack.coverArt} alt={currentTrack.title} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <Headphones size={11} fill="currentColor" />
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', height: '100%' }}>
          <div onClick={onOpenFullRoom} style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
            <img src={currentTrack.coverArt} alt={currentTrack.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{currentTrack.title}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{currentTrack.artist}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <button onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', color: 'var(--accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {playback.isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" style={{ transform: 'translateX(1px)' }} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextTrack(); }} style={{ padding: '6px', color: 'var(--text-secondary)' }}>
              <SkipForward size={16} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onOpenFullRoom(); }} style={{ padding: '6px', color: 'var(--text-primary)' }}>
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
