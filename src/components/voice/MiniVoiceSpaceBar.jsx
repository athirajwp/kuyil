import React from 'react';
import { 
  Radio, 
  Mic, 
  MicOff, 
  Hand, 
  ChevronUp, 
  X, 
  Users 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MiniVoiceSpaceBar = () => {
  const {
    activeVoiceRoom,
    setActiveVoiceRoom,
    isVoiceRoomMinimized,
    setIsVoiceRoomMinimized,
    isMicOn,
    setIsMicOn,
    isHandRaised,
    setIsHandRaised,
    activeTab,
    setActiveTab
  } = useApp();

  if (!activeVoiceRoom) return null;
  // Do not render mini player when user is viewing the full Voice Room page
  if (activeTab === 'voice' && !isVoiceRoomMinimized) return null;

  // Show mini bar if room is minimized OR if user navigated away from 'voice' tab
  const handleExpand = () => {
    setIsVoiceRoomMinimized(false);
    setActiveTab('voice');
  };

  const handleLeave = (e) => {
    e.stopPropagation();
    setActiveVoiceRoom(null);
    setIsVoiceRoomMinimized(false);
    setIsMicOn(false);
    setIsHandRaised(false);
  };

  const handleToggleMic = (e) => {
    e.stopPropagation();
    setIsMicOn((prev) => !prev);
  };

  const handleToggleHand = (e) => {
    e.stopPropagation();
    setIsHandRaised((prev) => !prev);
  };

  const speakerCount = activeVoiceRoom.speakers?.length || 1;
  const listenerCount = activeVoiceRoom.listenerCount || activeVoiceRoom.listeners?.length || 0;

  return (
    <div
      onClick={handleExpand}
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '68px',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: 'calc(100% - 24px)',
        maxWidth: '580px',
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        padding: '12px 16px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        backdropFilter: 'blur(16px)',
        userSelect: 'none'
      }}
    >
      {/* Left Info Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
        <div
          style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(24, 119, 242, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Radio size={20} color="#1877F2" className="animate-pulse" />
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              border: '2px solid var(--bg-card)'
            }}
          />
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: '#22c55e',
                letterSpacing: '0.4px'
              }}
            >
              LIVE VOICE SPACE
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' }}>
              <Users size={12} />
              <span>{speakerCount + listenerCount}</span>
            </span>
          </div>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '800',
              color: 'var(--text-primary)',
              margin: '2px 0 0 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {activeVoiceRoom.title}
          </h4>
        </div>
      </div>

      {/* Right Controls Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {/* Toggle Mic Button */}
        <button
          onClick={handleToggleMic}
          title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: isMicOn ? 'none' : '1px solid var(--border-color)',
            backgroundColor: isMicOn ? '#1877F2' : 'var(--bg-secondary)',
            color: isMicOn ? '#ffffff' : 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
        </button>

        {/* Leave Quietly Button */}
        <button
          onClick={handleLeave}
          title="Leave Room"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
