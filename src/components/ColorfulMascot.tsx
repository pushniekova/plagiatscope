
import React, { useEffect, useRef } from 'react';
import { Sparkles, Star, Paperclip } from 'lucide-react';

interface ColorfulMascotProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  position?: 'left' | 'right' | 'center';
  style?: React.CSSProperties;
  iconType?: 'star' | 'paperclip';
}

const ColorfulMascot: React.FC<ColorfulMascotProps> = ({ 
  size = 'md', 
  animated = true,
  position = 'right',
  style,
  iconType = 'star'
}) => {
  const mascotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (animated && mascotRef.current) {
      const mascot = mascotRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = mascot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate the angle between the mouse and mascot
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Only apply the effect if mouse is close enough
        if (distance < 300) {
          const followX = deltaX / 20;
          const followY = deltaY / 20;
          
          mascot.style.transform = `translate(${followX}px, ${followY}px) scale(1.05)`;
        } else {
          mascot.style.transform = 'translate(0, 0) scale(1)';
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [animated]);

  const getSize = () => {
    switch(size) {
      case 'sm': return 'w-20 h-20';
      case 'lg': return 'w-48 h-48';
      case 'md':
      default: return 'w-32 h-32';
    }
  };

  const getPosition = () => {
    switch(position) {
      case 'left': return 'left-0';
      case 'center': return 'left-1/2 -translate-x-1/2';
      case 'right':
      default: return 'right-0';
    }
  };

  const getIconSize = () => {
    switch(size) {
      case 'sm': return 48;
      case 'lg': return 144;
      case 'md':
      default: return 96;
    }
  };

  const MascotIcon = iconType === 'star' ? Star : Paperclip;

  return (
    <div 
      className={`relative ${getPosition()} ${animated ? 'transition-transform duration-300' : ''}`} 
      ref={mascotRef}
      style={style}
    >
      <div className={`${getSize()} relative`}>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          FHub
        </div>
        
        <div className={`w-full h-full flex items-center justify-center ${animated ? 'animated-float' : ''}`}>
          <MascotIcon 
            size={getIconSize()} 
            className="text-primary animate-pulse-slow" 
            strokeWidth={1.5}
            fill="rgba(var(--primary), 0.2)"
          />
        </div>
        
        {animated && (
          <>
            <div className="absolute -top-2 -left-2 text-amber-400 animated-sparkle animation-delay-200">
              <Sparkles size={16} />
            </div>
            <div className="absolute top-0 right-0 text-pink-500 animated-sparkle animation-delay-400">
              <Sparkles size={20} />
            </div>
            <div className="absolute bottom-0 right-4 text-blue-400 animated-sparkle animation-delay-600">
              <Sparkles size={16} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorfulMascot;
