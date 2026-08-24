import React, { useState, useRef, useEffect } from "react";
import { Search, Loader2, X, Play, Plus, ExternalLink } from "lucide-react";
import { useRealtimeSession } from "../../lib/realtime-store";
import { searchYouTubeMusic } from "../../lib/yt-search";

export const YouTubeAudioPlayer = ({ onSelectVideoId }) => {
  const searchContainerRef = useRef(null);
  const { session, addToQueue, playTrack } = useRealtimeSession();
  const currentTrack = session.playbackState.currentTrack;
  const videoId = currentTrack?.id || "GqlGdhjEXNg";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const activeStream = {
    id: videoId,
    title: currentTrack?.title || "YouTube Stream",
    artist: currentTrack?.artist || "YouTube Artist",
    cover: currentTrack?.coverArt || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchYouTubeMusic(searchQuery);
        setSearchResults(results);
      } catch (e) {
      } finally {
        setIsSearching(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      window.open(`https://music.youtube.com/search?q=${encodeURIComponent(searchQuery.trim())}`, "_blank");
    }
  };

  const handleSelectTrack = (trackItem) => {
    const track = {
      id: trackItem.id,
      title: trackItem.title,
      artist: trackItem.artist || "YouTube Artist",
      album: "YouTube Music",
      coverArt: trackItem.cover || `https://i.ytimg.com/vi/${trackItem.id}/hqdefault.jpg`,
      duration: trackItem.duration || 215,
      audioUrl: `https://www.youtube-nocookie.com/embed/${trackItem.id}`,
    };
    if (onSelectVideoId) onSelectVideoId(trackItem.id);
    playTrack(track);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const handleAddTrackToQueue = (e, trackItem) => {
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
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 30 }}>
      <div ref={searchContainerRef} style={{ position: 'relative', zIndex: 40 }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px', pointerEvents: 'none' }} />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchFocused(true);
            }}
            placeholder="Search YouTube Music..."
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              paddingLeft: '40px',
              paddingRight: '36px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              fontWeight: '500',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
          {isSearching ? (
            <Loader2 size={16} color="var(--text-muted)" className="animate-spin" style={{ position: 'absolute', right: '12px', top: '12px' }} />
          ) : searchQuery.length > 0 ? (
            <button onClick={() => setSearchQuery("")} style={{ position: 'absolute', right: '12px', top: '10px', color: 'var(--text-muted)', padding: '2px' }}>
              <X size={16} />
            </button>
          ) : null}
        </div>

        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div 
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '100%',
              marginTop: '8px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '10px',
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(16px)',
              maxHeight: '300px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 50
            }}
          >
            {/* Direct Link to YouTube Music */}
            <a
              href={`https://music.youtube.com/search?q=${encodeURIComponent(searchQuery.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ExternalLink size={14} color="var(--text-muted)" />
                <span>Search "{searchQuery}" on music.youtube.com</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>↗</span>
            </a>

            <div style={{ padding: '4px 8px 4px 8px', fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
              <span>YouTube Music Songs</span>
              <span>Click to Play</span>
            </div>

            {searchResults.map((t) => (
              <div
                key={t.id}
                onClick={() => handleSelectTrack(t)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                  <img src={t.cover} alt={t.title} style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.title}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.artist}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <button 
                    onClick={() => handleSelectTrack(t)} 
                    style={{ 
                      padding: '6px 10px', 
                      borderRadius: '8px', 
                      backgroundColor: 'var(--accent-color)', 
                      color: 'var(--accent-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Play track"
                  >
                    <Play size={12} fill="currentColor" />
                  </button>
                  <button 
                    onClick={(e) => handleAddTrackToQueue(e, t)} 
                    style={{ 
                      padding: '6px 10px', 
                      borderRadius: '8px', 
                      backgroundColor: 'var(--bg-card)', 
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Add to queue"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', maxHeight: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#000' }}>
        <img src={activeStream.cover} alt={activeStream.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', padding: '3px 10px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '11px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} /> YouTube Live
        </div>
      </div>
    </div>
  );
};
