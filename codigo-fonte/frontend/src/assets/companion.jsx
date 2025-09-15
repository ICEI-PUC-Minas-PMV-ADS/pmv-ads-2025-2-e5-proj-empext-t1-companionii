const SkynetIcon = ({ size = '32' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#ff4444', stopOpacity: 1 }} />
          <stop
            offset="70%"
            style={{ stopColor: '#cc0000', stopOpacity: 0.8 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: '#000000', stopOpacity: 0.3 }}
          />
        </radialGradient>

        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#666666', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#333333', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#000000', stopOpacity: 1 }}
          />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="url(#metalGradient)"
        stroke="#ff4444"
        strokeWidth="2"
      />

      {/* Outer ring segments */}
      <g stroke="#ff4444" strokeWidth="3" fill="none" filter="url(#glow)">
        <path d="M 100 20 A 80 80 0 0 1 156.57 56.57" opacity="0.9" />
        <path d="M 156.57 143.43 A 80 80 0 0 1 100 180" opacity="0.7" />
        <path d="M 43.43 143.43 A 80 80 0 0 1 20 100" opacity="0.8" />
        <path d="M 43.43 56.57 A 80 80 0 0 1 100 20" opacity="0.6" />
      </g>

      {/* Central neural network pattern */}
      <g stroke="#ff4444" strokeWidth="2" fill="none" opacity="0.8">
        {/* Main cross lines */}
        <line x1="100" y1="60" x2="100" y2="140" />
        <line x1="60" y1="100" x2="140" y2="100" />

        {/* Diagonal connections */}
        <line x1="75" y1="75" x2="125" y2="125" />
        <line x1="125" y1="75" x2="75" y2="125" />

        {/* Network nodes */}
        <circle cx="100" cy="75" r="4" fill="#ff4444" />
        <circle cx="100" cy="125" r="4" fill="#ff4444" />
        <circle cx="75" cy="100" r="4" fill="#ff4444" />
        <circle cx="125" cy="100" r="4" fill="#ff4444" />
        <circle cx="85" cy="85" r="3" fill="#ff6666" />
        <circle cx="115" cy="85" r="3" fill="#ff6666" />
        <circle cx="85" cy="115" r="3" fill="#ff6666" />
        <circle cx="115" cy="115" r="3" fill="#ff6666" />
      </g>

      {/* Central core eye */}
      <circle
        cx="100"
        cy="100"
        r="20"
        fill="url(#coreGlow)"
        filter="url(#glow)"
      />
      <circle cx="100" cy="100" r="12" fill="#ff0000" opacity="0.9" />
      <circle cx="100" cy="100" r="6" fill="#ffffff" opacity="0.3" />

      {/* Scanning lines */}
      <g stroke="#ff4444" strokeWidth="1" opacity="0.4">
        <line x1="30" y1="70" x2="170" y2="70">
          <animate
            attributeName="y1"
            values="70;130;70"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="70;130;70"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line x1="30" y1="100" x2="170" y2="100">
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Corner connection points */}
      <g fill="#ff4444" opacity="0.7">
        <rect x="25" y="25" width="6" height="6" transform="rotate(45 28 28)" />
        <rect
          x="169"
          y="25"
          width="6"
          height="6"
          transform="rotate(45 172 28)"
        />
        <rect
          x="25"
          y="169"
          width="6"
          height="6"
          transform="rotate(45 28 172)"
        />
        <rect
          x="169"
          y="169"
          width="6"
          height="6"
          transform="rotate(45 172 172)"
        />
      </g>

      {/* Pulsing outer glow */}
      <circle
        cx="100"
        cy="100"
        r="98"
        fill="none"
        stroke="#ff4444"
        strokeWidth="1"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="98;102;98"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default SkynetIcon;
