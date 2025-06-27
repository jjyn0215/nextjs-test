'use client';

import { useState, useEffect } from 'react';

type StatusType = 'online' | 'degraded' | 'offline';

interface StatusIconProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export default function StatusIcon({ 
  status, 
  size = 'md', 
  pulse = true 
}: StatusIconProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // 사이즈별 설정
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };
  
  // 상태별 색상 설정
  const statusClasses = {
    online: 'bg-gradient-to-r from-green-400 to-green-500 shadow-green-500/50',
    degraded: 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-500/50',
    offline: 'bg-gradient-to-r from-red-400 to-red-500 shadow-red-500/50'
  };
  
  // 방사형 파동 애니메이션을 위한 효과
  useEffect(() => {
    if (pulse && (status === 'online' || status === 'degraded')) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [pulse, status]);

  return (
    <div className="relative flex items-center justify-center">
      <div 
        className={`
          ${sizeClasses[size]} rounded-full 
          ${statusClasses[status]}
          shadow-lg z-10
        `}
      />
      
      {/* Pulse 효과 (온라인 또는 degraded 상태일 때만) */}
      {pulse && (status === 'online' || status === 'degraded') && (
        <div 
          className={`
            absolute rounded-full
            ${isAnimating ? 'animate-ping opacity-75' : 'opacity-0'}
            ${status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}
            ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'}
          `}
        />
      )}
    </div>
  );
}
