import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SpinWheelProps {
  onSpin: (result: string) => void;
  isSpinning: boolean;
}

const REWARDS = ['WL', 'Try Again', '1x Spin', 'Try Again', 'WL', '1x Spin', 'Try Again', 'WL'];
const SEGMENT_COLORS = ['wheel-1', 'wheel-2', 'wheel-3', 'wheel-4', 'wheel-5', 'wheel-6', 'wheel-7', 'wheel-8'];

export const SpinWheel: React.FC<SpinWheelProps> = ({ onSpin, isSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const [winningSegment, setWinningSegment] = useState<number | null>(null);
  const [showWinningAnimation, setShowWinningAnimation] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    // Reset previous winning animation
    setWinningSegment(null);
    setShowWinningAnimation(false);
    
    // Calculate random spin (3-4 full rotations + random segment)
    const minSpins = 3;
    const maxSpins = 4;
    const fullRotations = (Math.random() * (maxSpins - minSpins) + minSpins) * 360;
    const segmentAngle = 360 / 8;
    const randomSegment = Math.floor(Math.random() * 8);
    const finalRotation = fullRotations + (randomSegment * segmentAngle) + (segmentAngle / 2);
    
    setRotation(finalRotation);
    
    // Determine winning segment (accounting for clockwise rotation)
    const winningIndex = (8 - Math.floor((finalRotation % 360) / segmentAngle)) % 8;
    
    setTimeout(() => {
      setWinningSegment(winningIndex);
      setShowWinningAnimation(true);
      onSpin(REWARDS[winningIndex]);
      
      // Reset animation after a delay
      setTimeout(() => setShowWinningAnimation(false), 2000);
    }, 3500);
  };

  const createSegmentPath = (index: number) => {
    const angle = (360 / 8) * index;
    const nextAngle = (360 / 8) * (index + 1);
    
    const x1 = 50 + 45 * Math.cos((angle - 90) * Math.PI / 180);
    const y1 = 50 + 45 * Math.sin((angle - 90) * Math.PI / 180);
    const x2 = 50 + 45 * Math.cos((nextAngle - 90) * Math.PI / 180);
    const y2 = 50 + 45 * Math.sin((nextAngle - 90) * Math.PI / 180);
    
    const largeArcFlag = (nextAngle - angle) > 180 ? 1 : 0;
    
    return `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const angle = (360 / 8) * index + (360 / 16); // Center of segment
    const radius = 30; // Distance from center
    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
    return { x, y, angle };
  };

  return (
    <div className="relative">
      {/* Wheel Container */}
      <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-gray-800 bg-white">
        <svg 
          viewBox="0 0 100 100" 
          className={cn(
            "w-full h-full transition-transform duration-[3500ms]",
            isSpinning && "animate-spin-wheel"
          )}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            '--spin-degrees': `${rotation}deg`
          } as React.CSSProperties}
        >
          {REWARDS.map((reward, index) => {
            const position = getTextPosition(index);
            const colorClass = SEGMENT_COLORS[index];
            
            return (
              <g key={index}>
                {/* Segment Background */}
                <path
                  d={createSegmentPath(index)}
                  className={cn(`fill-${colorClass}`, "stroke-white stroke-[0.8]")}
                />
                
                {/* Text */}
                <text
                  x={position.x}
                  y={position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white text-[3.5px] font-bold font-sans"
                  transform={`rotate(${position.angle}, ${position.x}, ${position.y})`}
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {reward}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full shadow-lg border-2 border-white"></div>
        
        {/* Pointer */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-l-transparent border-r-transparent border-b-gray-800 shadow-lg z-10"></div>
      </div>

      {/* Spin Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={cn(
            "px-12 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
            "rounded-xl font-bold text-lg tracking-wider uppercase shadow-lg",
            "transition-all duration-200 transform",
            "backdrop-blur-sm border border-white/20",
            !isSpinning && "hover:scale-105 hover:shadow-xl animate-pulse-gentle",
            isSpinning && "opacity-50 cursor-not-allowed scale-95",
            "focus:outline-none focus:ring-4 focus:ring-primary/30"
          )}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};