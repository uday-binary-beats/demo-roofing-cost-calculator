import React from 'react';
import type { Slope } from '../types';

interface SlopeIconProps {
  type: Slope;
}

const PATHS: Record<Slope, React.ReactNode> = {
  flat: (
    <>
      <rect x="4" y="18" width="32" height="4" fill="#94a3b8" rx="1" />
      <rect x="4" y="10" width="32" height="8" fill="#cbd5e1" rx="1" />
    </>
  ),
  low: (
    <>
      <polygon points="4,22 20,14 36,22" fill="#cbd5e1" />
      <polygon points="4,22 20,14 36,22 36,26 4,26" fill="#94a3b8" />
    </>
  ),
  moderate: (
    <>
      <polygon points="4,24 20,10 36,24" fill="#cbd5e1" />
      <polygon points="4,24 20,10 36,24 36,28 4,28" fill="#94a3b8" />
    </>
  ),
  steep: (
    <>
      <polygon points="10,26 20,6 30,26" fill="#cbd5e1" />
      <polygon points="10,26 20,6 30,26 30,30 10,30" fill="#94a3b8" />
    </>
  ),
};

const SlopeIcon: React.FC<SlopeIconProps> = ({ type }) => (
  <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {PATHS[type]}
  </svg>
);

export default SlopeIcon;
