'use client';

import { motion } from 'framer-motion';
import StatusIcon from './StatusIcon';

type StatusType = 'online' | 'degraded' | 'offline';

interface StatusIndicatorProps {
  status: StatusType;
  animate?: boolean;
}

export default function StatusIndicator({ status, animate = true }: StatusIndicatorProps) {
  // 상태별 텍스트 및 색상
  const statusConfig = {
    online: {
      text: '온라인',
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
      textColor: 'text-white',
    },
    degraded: {
      text: '성능 저하',
      bgColor: 'bg-gradient-to-r from-yellow-400 to-amber-600',
      textColor: 'text-white',
    },
    offline: {
      text: '오프라인',
      bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
      textColor: 'text-white',
    }
  };
  
  const { text, bgColor, textColor } = statusConfig[status];
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative inline-flex items-center px-6 py-3 rounded-full ${bgColor} ${textColor} text-xl font-bold shadow-lg`}
    >
      <StatusIcon status={status} size="lg" pulse={animate} />
      <span className="ml-3">{text}</span>
      
      {/* 배경 글로우 효과 */}
      <div className={`
        absolute inset-0 -z-10 rounded-full opacity-30
        ${status === 'online' ? 'bg-green-400' : status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'}
        blur-lg
      `}></div>
    </motion.div>
  );
}
