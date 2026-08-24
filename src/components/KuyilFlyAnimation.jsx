import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const KuyilFlyAnimation = () => {
  const { flyKey, isFlying, setIsFlying } = useApp();
  const [targetCoords, setTargetCoords] = useState(null);
  const [particles, setParticles] = useState([]);
  const [isLanding, setIsLanding] = useState(false);
  const [frameIndex, setFrameIndex] = useState(2); // 2: Wings UP, 3: Wings MID, 4: Wings LOW, 1: Landed
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Calculate target coordinates of header logo
    const calculateTarget = () => {
      const el = document.getElementById('kuyil-logo-target');
      if (el) {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          rectLeft: rect.left,
          rectTop: rect.top
        };
      }
      return {
        x: 100,
        y: 30,
        rectLeft: 80,
        rectTop: 10
      };
    };

    const target = calculateTarget();
    setTargetCoords(target);
    setIsFlying(true);
    setIsLanding(false);
    setFrameIndex(2);

    // Flapping wing frame sequence: 2 -> 3 -> 4 -> 3 -> 2 ...
    const flapSequence = [2, 3, 4, 3];
    let seqIdx = 0;

    const flapTimer = setInterval(() => {
      seqIdx = (seqIdx + 1) % flapSequence.length;
      setFrameIndex(flapSequence[seqIdx]);
    }, 110);

    // Spawn monochrome trail particles along flight path
    const particleTimer = setInterval(() => {
      particleIdRef.current += 1;
      const symbols = ['♫', '♪', '✦', '★', '♬'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      setParticles((prev) => [
        ...prev.slice(-18),
        {
          id: particleIdRef.current,
          symbol,
          offsetY: (Math.random() - 0.5) * 30,
          scale: 0.9 + Math.random() * 0.6
        }
      ]);
    }, 100);

    // Trigger landing pose and ripple as bird hits navbar target
    const landingTimer = setTimeout(() => {
      clearInterval(flapTimer);
      setFrameIndex(1); // Set to pose 1 (Landed logo pose)
      setIsLanding(true);
    }, 1800);

    // Complete flight animation
    const endTimer = setTimeout(() => {
      setIsFlying(false);
      clearInterval(particleTimer);
    }, 2400);

    return () => {
      clearInterval(flapTimer);
      clearInterval(particleTimer);
      clearTimeout(landingTimer);
      clearTimeout(endTimer);
    };
  }, [flyKey]);

  if (!isFlying || !targetCoords) return null;

  return (
    <div className="kuyil-fly-overlay">
      {/* Background Dimmed Glass Spotlight during initial big bird splash */}
      <div className="kuyil-intro-spotlight" />

      {/* Dynamic Target Landing Ripple Effect */}
      {isLanding && (
        <div
          className="kuyil-landing-ripple-container"
          style={{
            left: `${targetCoords.rectLeft}px`,
            top: `${targetCoords.rectTop}px`
          }}
        >
          <div className="kuyil-ripple-ring ring-1" />
          <div className="kuyil-ripple-ring ring-2" />
          <div className="kuyil-ripple-ring ring-3" />
        </div>
      )}

      {/* Flying Kuyil Bird Wrapper */}
      <div
        className="kuyil-flying-bird-container"
        style={{
          '--target-x': `${targetCoords.x}px`,
          '--target-y': `${targetCoords.y}px`
        }}
      >
        <div className="kuyil-flying-bird-inner">
          {/* Animated Kuyil Bird Frame Image */}
          <div className="kuyil-flying-frame-wrapper">
            <img
              src={`/kuyil-frame-${frameIndex}.png`}
              alt="Kuyil Bird Flying"
              className="kuyil-flying-frame-img"
            />
          </div>

          {/* Floating Monochrome Music Note Trail */}
          <div className="kuyil-trail-container">
            {particles.map((p) => (
              <span
                key={p.id}
                className="kuyil-trail-note"
                style={{
                  top: `${p.offsetY}px`,
                  transform: `scale(${p.scale})`
                }}
              >
                {p.symbol}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
