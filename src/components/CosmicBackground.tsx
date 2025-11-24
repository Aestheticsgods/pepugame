import React from 'react';

interface CosmicBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`cosmic-bg min-h-screen relative overflow-hidden ${className}`}>
      {/* Falling Stars Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large falling stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`falling-star-${i}`}
            className="absolute animate-falling-star"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 12 + 16}px`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              color: ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#ffffff'][Math.floor(Math.random() * 5)],
              filter: 'drop-shadow(0 0 6px currentColor)',
            }}
          >
            ⭐
          </div>
        ))}
        
        {/* Medium falling particles */}
        {[...Array(35)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-falling-star"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(147, 51, 234, 0.7)', 'rgba(236, 72, 153, 0.6)', 'rgba(251, 191, 36, 0.9)'][Math.floor(Math.random() * 4)],
              boxShadow: '0 0 8px currentColor',
              animationDelay: `${Math.random() * 18}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          />
        ))}

        {/* Small twinkling background stars */}
        {[...Array(60)].map((_, i) => (
          <div
            key={`static-star-${i}`}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Constellation patterns */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`constellation-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <svg width="40" height="40" className="text-primary/30">
              <circle cx="5" cy="5" r="1" fill="currentColor" />
              <circle cx="15" cy="8" r="1" fill="currentColor" />
              <circle cx="25" cy="12" r="1" fill="currentColor" />
              <circle cx="35" cy="15" r="1" fill="currentColor" />
              <line x1="5" y1="5" x2="15" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="15" y1="8" x2="25" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="25" y1="12" x2="35" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </div>
        ))}
      </div>
      
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      
      {children}
    </div>
  );
};