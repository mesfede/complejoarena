import React from 'react';
import caLogoImg from './calogo2.png';

interface ArenaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
}

export const ArenaLogo: React.FC<ArenaLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'h-8 w-auto max-w-[100px]',
    sm: 'h-10 w-auto max-w-[120px]',
    md: 'h-14 w-auto max-w-[160px]',
    lg: 'h-16 sm:h-20 w-auto max-w-[200px]',
    xl: 'h-24 sm:h-28 w-auto max-w-[260px]',
    hero: 'h-28 sm:h-36 w-auto max-w-[320px]',
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={caLogoImg}
        alt="Logo Complejo Arena"
        className={`${sizeClasses[size]} object-contain select-none transition-transform hover:scale-105 drop-shadow-sm`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
