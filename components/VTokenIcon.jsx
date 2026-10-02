import React from 'react';

export default function VTokenIcon({ size = 32, className = "" }) {
  return (
    <img
      src="/v-coin.png"
      alt="V-Token"
      style={{ width: size, height: size }}
      // Tailwind classes block mouse interactions and selection
      className={`object-contain pointer-events-none select-none drop-shadow-md ${className}`}
      // HTML & React attributes to block dragging and right-click
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
