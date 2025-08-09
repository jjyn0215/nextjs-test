'use client';

type StatusType = 'online' | 'degraded' | 'offline';

interface StatusIconProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusIcon({ 
  status, 
  size = 'md'
}: StatusIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  };
  
  const statusConfig = {
    online: {
      icon: '✓',
      className: 'bg-green-500 text-white'
    },
    degraded: {
      icon: '!',
      className: 'bg-orange-500 text-white'
    },
    offline: {
      icon: '✕',
      className: 'bg-red-500 text-white'
    }
  };

  const config = statusConfig[status];

  return (
    <div 
      className={`
        ${sizeClasses[size]} rounded-full ${config.className}
        flex items-center justify-center font-bold
        shadow-sm transition-all duration-200 ease-out
      `}
    >
      {config.icon}
    </div>
  );
}
