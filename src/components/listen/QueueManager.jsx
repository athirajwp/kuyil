import React, { useState } from "react";
import { Plus, Trash2, Music, Search, Loader2, X, ExternalLink } from "lucide-react";
import { searchYouTubeMusic } from "../../lib/yt-search";

export const QueueManager = ({
  queue,
  currentUser,
  onRemoveTrackFromQueue,
  onAddTrackToQueue,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      window.open(`https://music.youtube.com/search?q=${encodeURIComponent(searchQuery.trim())}`, "_blank");
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchYouTubeMusic(query);
      setSearchResults(
        results.map((t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist || "YouTube Artist",
          album: "YouTube Music",
          coverArt: t.cover,
          duration: t.duration || 240,
          audioUrl: `https://www.youtube-nocookie.com/embed/${t.id}`,
        }))
      );
    } catch (e) {
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Music size={18} color="var(--text-primary)" />
            <span>Collaborative Queue</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Manage queued tracks together</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="pill active"
          style={{ padding: '6px 14px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Plus size={14} />
          <span>Add Song</span>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
        {queue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 10px', color: 'var(--text-muted)', fontSize: '13px', backgroundColor: 'var(--bg-card)', borderRadius: '14px', border: '1px dashed var(--border-color)' }}>
            Queue is empty. Click "+ Add Song" to queue up music!
          </div>
        ) : (
          queue.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '10px 12px',
                borderRadius: '14px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                <img src={item.track.coverArt} alt={item.track.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.track.title}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.track.artist} • Added by {item.addedBy?.name || 'User'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveTrackFromQueue(item.id)}
                style={{ padding: '6px 8px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                title="Remove Song"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--bg-card)', width: '100%', maxWidth: '420px', borderRadius: '24px', padding: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} color="var(--text-primary)" />
                <span>Search Music to Add</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'var(--text-muted)', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '12px', pointerEvents: 'none' }} />
              <input
                type="text"
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search songs on YouTube..."
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  paddingLeft: '40px',
                  paddingRight: '36px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  color: 'var(--text-primary)'
                }}
              />
              {isSearching && <Loader2 size={16} color="var(--text-muted)" className="animate-spin" style={{ position: 'absolute', right: '12px', top: '12px' }} />}
            </div>

            {searchQuery.trim().length > 0 && (
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
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
              {searchResults.map((track) => (
                <div
                  key={track.id}
                  onClick={() => {
                    onAddTrackToQueue(track);
                    setShowAddModal(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                    <img src={track.coverArt} alt={track.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{track.title}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{track.artist}</p>
                    </div>
                  </div>
                  <button className="pill active" style={{ padding: '4px 12px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
