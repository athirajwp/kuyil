import React from 'react';

export const KuyilLogo = ({ size = 44, style = {}, className = '' }) => {
  return (
    <div
      title="Kuyil"
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style
      }}
    >
      <img
        src="/kuyil-frame-1.png"
        alt="Kuyil Logo"
        className="kuyil-navbar-logo-img"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
};

export const VibespaceLogo = KuyilLogo;
