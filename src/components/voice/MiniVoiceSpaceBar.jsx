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
        bottom: 'var(--bottom-nav-height, 60px)',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: '100%',
        maxWidth: 'var(--max-width, 620px)',
        backgroundColor: 'var(--bg-primary, #ffffff)',
        color: 'var(--text-primary, #050505)',
        borderTop: '1px solid var(--border-color, #e4e6eb)',
        borderBottom: '1px solid var(--border-color, #e4e6eb)',
        borderRadius: '0px',
        padding: '8px 12px',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
        zIndex: 999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        backdropFilter: 'blur(16px)',
        userSelect: 'none'
      }}
    >
      {/* Left Info Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        <div
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(24, 119, 242, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Radio size={18} color="#1877F2" className="animate-pulse" />
          <span
            style={{
              position: 'absolute',
              top: '1px',
              right: '1px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              border: '1.5px solid var(--bg-primary, #ffffff)'
            }}
          />
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: '#22c55e',
                letterSpacing: '0.4px'
              }}
            >
              LIVE VOICE SPACE
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted, #65676b)' }}>•</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #65676b)', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '600' }}>
              <Users size={11} />
              <span>{speakerCount + listenerCount}</span>
            </span>
          </div>
          <h4
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'var(--text-primary, #050505)',
              margin: '1px 0 0 0',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Toggle Mic Button */}
        <button
          onClick={handleToggleMic}
          title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: isMicOn ? 'none' : '1px solid var(--border-color, #e4e6eb)',
            backgroundColor: isMicOn ? '#1877F2' : 'var(--bg-secondary, #f0f2f5)',
            color: isMicOn ? '#ffffff' : 'var(--text-primary, #050505)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
        </button>

        {/* Leave Quietly Button */}
        <button
          onClick={handleLeave}
          title="Leave Room"
          style={{
            width: '36px',
            height: '36px',
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
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
