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
      className={`relative inline-flex items-center px-4 py-2 rounded-lg ${bgColor} ${textColor} text-sm font-semibold shadow-md`}
    >
      <StatusIcon status={status} size="sm" />
      <span className="ml-2">{text}</span>
      
      {/* 배경 글로우 효과 - 작게 조정 */}
      <div className={`
        absolute inset-0 -z-10 rounded-lg opacity-20
        ${status === 'online' ? 'bg-green-400' : status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'}
        blur-sm
      `}></div>
    </motion.div>
  );
}
