export default function SlowServerLoading() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">느린 서버 페이지</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-pulse">
        {/* 헤더 스켈레톤 */}
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-6"></div>
        
        {/* 서버 목록 스켈레톤 */}
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-3"></div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 로딩 상태 표시 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            서버에서 데이터를 가져오는 중입니다... (3초 소요)
          </p>
        </div>
      </div>
    </div>
  );
}
