'use client';

import StatusIcon from './StatusIcon';
import { motion } from 'framer-motion';

interface ServerCardProps {
  name: string;
  online: boolean;
  responseTime?: number;
  statusCode?: number;
}

export default function ServerCard({
  name,
  online,
  responseTime,
  statusCode
}: ServerCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-xl border
        ${online 
          ? 'border-green-200 dark:border-green-900' 
          : 'border-red-200 dark:border-red-900'
        }
        bg-white dark:bg-gray-800 p-0
        transition-all duration-300 ease-in-out
        hover:shadow-lg
      `}
    >
      <div 
        className={`
          absolute top-0 h-1 w-full
          ${online ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}
        `}
      />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <StatusIcon status={online ? 'online' : 'offline'} size="sm" />
            <h3 className="font-medium">{name}</h3>
          </div>
          
          <span 
            className={`
              px-3 py-1 rounded-full text-xs font-semibold
              ${online 
                ? 'text-green-700 bg-green-100 dark:text-green-200 dark:bg-green-900/30' 
                : 'text-red-700 bg-red-100 dark:text-red-200 dark:bg-red-900/30'
              }
            `}
          >
            {online ? '온라인' : '오프라인'}
          </span>
        </div>
        
        {/* 항상 표시되는 정보 영역 */}
        <div className="text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-3">
          <div className="space-y-2">
            {responseTime !== undefined && (
              <div className="flex justify-between items-center">
                <span>응답 시간</span>
                <span className="font-mono">{responseTime}ms</span>
              </div>
            )}
            
            {statusCode !== undefined && (
              <div className="flex justify-between items-center">
                <span>상태 코드</span>
                <span 
                  className={`font-mono ${
                    statusCode >= 200 && statusCode < 300
                      ? 'text-green-600 dark:text-green-400'
                      : statusCode >= 300 && statusCode < 400
                      ? 'text-blue-600 dark:text-blue-400'
                      : statusCode >= 400 && statusCode < 500
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {statusCode}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
