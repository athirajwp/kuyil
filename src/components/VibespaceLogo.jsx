import React from 'react';

export const KuyilLogo = ({ size = 44, style = {} }) => {
  return (
    <div
      title="Kuyil"
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
        src="/kuyil-logo.png"
        alt="Kuyil Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'var(--logo-filter, brightness(0))',
          display: 'block'
        }}
      />
    </div>
  );
};

export const VibespaceLogo = KuyilLogo;
