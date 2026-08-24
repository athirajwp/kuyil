import React from "react";

export const FloatingReactions = ({ reactions = [] }) => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 30 }}>
      {reactions.map((r, index) => {
        const leftPercent = 20 + ((index * 37) % 60);
        return (
          <div
            key={r.id}
            className="animate-fade-in"
            style={{
              position: 'absolute',
              bottom: '40px',
              left: `${leftPercent}%`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '36px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>{r.emoji}</span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#60a5fa', backgroundColor: 'rgba(0,0,0,0.75)', padding: '2px 8px', borderRadius: '12px', marginTop: '2px' }}>
              {r.userName}
            </span>
          </div>
        );
      })}
    </div>
  );
};
