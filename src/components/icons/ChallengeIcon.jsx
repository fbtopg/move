import React from 'react';

const ChallengeIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="17" width="18" height="4" />
    <rect x="5" y="12" width="14" height="3" />
    <rect x="7" y="7" width="10" height="3" />
    <rect x="9" y="2" width="6" height="3" />
  </svg>
);

export default ChallengeIcon;