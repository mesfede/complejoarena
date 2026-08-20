import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

// Flat Line Soccer Ball
export const SoccerBallIcon: React.FC<IconProps> = ({ 
  className = "w-6 h-6 shrink-0 max-w-full max-h-full", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.9" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0`}
  >
    <circle cx="12" cy="12" r="9.5" />
    <polygon points="12,7.5 15.8,10.2 14.4,14.8 9.6,14.8 8.2,10.2" fill={color} fillOpacity="0.18" />
    <line x1="12" y1="7.5" x2="12" y2="2.5" />
    <line x1="15.8" y1="10.2" x2="21" y2="8.5" />
    <line x1="14.4" y1="14.8" x2="18.2" y2="19.5" />
    <line x1="9.6" y1="14.8" x2="5.8" y2="19.5" />
    <line x1="8.2" y1="10.2" x2="3" y2="8.5" />
  </svg>
);

// Flat Line Field Hockey Stick & Ball (Palo de hockey césped con gancho J y bocha)
export const HockeyIcon: React.FC<IconProps> = ({ 
  className = "w-6 h-6 shrink-0 max-w-full max-h-full", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.9" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0`}
  >
    {/* Authentic Field Hockey Stick: angled shaft + curved J-toe head */}
    <path 
      d="M5.5 2.5 L13 13 C14.2 14.8 15.8 18.8 19 18.8 C20.8 18.8 21.8 17.2 21.2 15.5 C20.5 13.8 18.8 14 17.8 14.8 C16.8 15.6 15.5 14.2 14.5 12.8 L7 2" 
      fill={color} 
      fillOpacity="0.18" 
    />
    {/* Grip Tape Bands on Handle */}
    <line x1="7" y1="5" x2="8.8" y2="6.5" />
    <line x1="9" y1="7.5" x2="10.8" y2="9" />
    {/* Hockey Ball */}
    <circle cx="7" cy="17.5" r="2.6" fill={color} fillOpacity="0.25" />
    <circle cx="7" cy="17.5" r="1" fill={color} />
  </svg>
);

// Flat Line Tennis Racket & Ball (Paleta / Raqueta de tenis con encordado y pelota)
export const TennisIcon: React.FC<IconProps> = ({ 
  className = "w-6 h-6 shrink-0 max-w-full max-h-full", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="1.9" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0`}
  >
    {/* Strung Oval Racket Head */}
    <ellipse cx="14.5" cy="9.5" rx="5.5" ry="6.8" transform="rotate(-35 14.5 9.5)" fill={color} fillOpacity="0.12" />
    {/* String pattern */}
    <line x1="12.5" y1="5.5" x2="16.5" y2="13.5" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    <line x1="9.5" y1="9.5" x2="19.5" y2="9.5" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    {/* Racket Throat */}
    <path d="M10.2 13.8 L7.8 16.2" />
    <path d="M12.2 15.5 L9.8 17.8" />
    {/* Shaft & Handle */}
    <path d="M8.8 17 L3.5 22.2" strokeWidth="2.4" />
    <line x1="2.8" y1="21.5" x2="4.2" y2="23" strokeWidth="3" />
    {/* Tennis Ball with classic curved seam */}
    <circle cx="6" cy="6.5" r="2.8" fill={color} fillOpacity="0.25" />
    <path d="M4 6.5 Q 6 7.5 7.5 5" strokeWidth="1.2" />
  </svg>
);

// Clean Flat Line Birthday Cake
export const BirthdayCakeIcon: React.FC<IconProps> = ({ 
  className = "w-8 h-8 shrink-0 max-w-full max-h-full", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0`}
  >
    <path d="M20 21v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7" />
    <path d="M4 21h16" />
    <path d="M7 12V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5" />
    <line x1="12" y1="5" x2="12" y2="2" />
    <path d="M12 2a1 1 0 0 1 1 1c0 1-1 1-1 1s-1 0-1-1a1 1 0 0 1 1-1z" fill={color} />
    <path d="M4 16c2 1 4 1 6 0 2-1 4-1 6 0 2 1 3 0 4 0" />
  </svg>
);

// Clean Flat Line Trophy
export const TrophyIcon: React.FC<IconProps> = ({ 
  className = "w-8 h-8 shrink-0 max-w-full max-h-full", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0`}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
    <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
    <polygon points="12,6.5 13,8.5 15,8.8 13.5,10.2 14,12.2 12,11.2 10,12.2 10.5,10.2 9,8.8 11,8.5" fill={color} fillOpacity="0.3" stroke="none" />
  </svg>
);

// Clean Flat Line Whistle (Escuelitas)
export const WhistleIcon: React.FC<IconProps> = ({ 
  className = "w-8 h-8 shrink-0 max-w-full max-h-full", 
  color = "currentColor" 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} shrink-0`}
  >
    <path d="M10 6h10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v2a6 6 0 1 1-6-6z" />
    <circle cx="8" cy="14" r="2.5" fill={color} fillOpacity="0.25" />
    <path d="M16 6V4" />
    <path d="M2 14c-.5-1.5 0-3.5 1-4.5" strokeDasharray="1.5 1.5" />
  </svg>
);

// Triple Sports Flat Icon with spacious circular framing
export const CourtsTripleSportBadge: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const stroke = isDark ? "#0f172a" : "#ffffff";
  return (
    <div className="flex items-center justify-center gap-1.5 w-full">
      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0">
        <SoccerBallIcon className="w-5 h-5" color={stroke} />
      </div>
      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0">
        <HockeyIcon className="w-5 h-5" color={stroke} />
      </div>
      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0">
        <TennisIcon className="w-5 h-5" color={stroke} />
      </div>
    </div>
  );
};
