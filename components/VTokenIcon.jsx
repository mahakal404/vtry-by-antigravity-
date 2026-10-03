import React from 'react';

export default function VTokenIcon({ size = 32, className = "" }) {
  return (
    <img
      src="/v-coin.png"
      alt="V-Token"
      style={{ width: size, height: size }}
      className={`object-contain pointer-events-none select-none drop-shadow-md ${className}`}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
