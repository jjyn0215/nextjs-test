'use client';

import { motion } from 'framer-motion';

interface StatusBarProps {
  onlineCount: number;
  totalCount: number;
  status: 'online' | 'degraded' | 'offline';
}

export default function StatusBar({ onlineCount, totalCount, status }: StatusBarProps) {
  const percentage = totalCount > 0 ? (onlineCount / totalCount) * 100 : 0;
  
  // 상태별 색상
  const barColor = 
    status === 'online' ? 'bg-gradient-to-r from-green-400 to-green-600' :
    status === 'degraded' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
    'bg-gradient-to-r from-red-400 to-red-600';
    
  const barShadow = 
    status === 'online' ? 'shadow-green-500/30' :
    status === 'degraded' ? 'shadow-yellow-500/30' :
    'shadow-red-500/30';

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${barColor} ${barShadow} shadow-lg relative overflow-hidden`}
      >
        {/* 움직이는 그래디언트 효과 */}
        <div className="absolute inset-0 bg-white opacity-20 w-20 h-full skew-x-30 animate-shimmer" />
      </motion.div>
    </div>
  );
}
