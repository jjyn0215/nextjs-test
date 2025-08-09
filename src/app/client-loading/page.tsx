'use client';

import { useState } from 'react';

export default function ClientLoadingExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData('데이터가 성공적으로 로드되었습니다!');
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">클라이언트 로딩 상태 예시</h1>
      
      <div className="space-y-4">
        <button
          onClick={fetchData}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isLoading 
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              로딩 중...
            </div>
          ) : (
            '데이터 가져오기'
          )}
        </button>
        
        {/* 로딩 상태에 따른 UI */}
        {isLoading && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-700 dark:text-blue-300">데이터를 가져오는 중입니다...</span>
            </div>
          </div>
        )}
        
        {/* 결과 표시 */}
        {data && !isLoading && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300">{data}</p>
          </div>
        )}
      </div>
    </div>
  );
}
