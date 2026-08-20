import React, { useState } from 'react';
import { 
  SoccerBallIcon, 
  HockeyIcon,
  TennisIcon,
  BirthdayCakeIcon, 
  TrophyIcon, 
  WhistleIcon 
} from './SportsIcons';

interface CategoryIconProps {
  type: 'canchas' | 'cumpleanos' | 'torneos' | 'escuelitas';
  customSrc?: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  type, 
  customSrc,
  className = "w-12 h-12" 
}) => {
  const [imgError, setImgError] = useState(false);

  if (customSrc && !imgError) {
    return (
      <img
        src={customSrc}
        alt={type}
        onError={() => setImgError(true)}
        className={`${className} object-contain max-w-full max-h-full shrink-0 drop-shadow-md`}
      />
    );
  }

  // Scalable fallback vector designs strictly contained within the requested className size
  switch (type) {
    case 'canchas':
      return (
        <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0">
          <SoccerBallIcon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md transition-transform duration-300 group-hover:scale-110" color="#c2f154" />
          <HockeyIcon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md transition-transform duration-300 group-hover:scale-110" color="#c2f154" />
          <TennisIcon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md transition-transform duration-300 group-hover:scale-110" color="#c2f154" />
        </div>
      );
    case 'cumpleanos':
      return (
        <div className={`${className} flex items-center justify-center shrink-0`}>
          <BirthdayCakeIcon className="w-full h-full max-w-full max-h-full" color="#f472b6" />
        </div>
      );
    case 'torneos':
      return (
        <div className={`${className} flex items-center justify-center shrink-0`}>
          <TrophyIcon className="w-full h-full max-w-full max-h-full" color="#fbbf24" />
        </div>
      );
    case 'escuelitas':
      return (
        <div className={`${className} flex items-center justify-center shrink-0`}>
          <WhistleIcon className="w-full h-full max-w-full max-h-full" color="#38bdf8" />
        </div>
      );
    default:
      return null;
  }
};
