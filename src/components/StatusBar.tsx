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

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full ${barColor} rounded-full relative overflow-hidden`}
      >
        {/* 개선된 shimmer 효과 */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}
