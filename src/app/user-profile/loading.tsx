export default function UserProfileLoading() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">사용자 프로필</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* 사용자 정보 스켈레톤 */}
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-4 animate-pulse"></div>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        {/* 포스트 목록 스켈레톤 */}
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2 animate-pulse"></div>
        <div className="space-y-2 mb-6">
          <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* 통계 스켈레톤 */}
        <div className="flex gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-1 animate-pulse"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14 mb-1 animate-pulse"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-8 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* 로딩 상태 표시 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            🚀 사용자 데이터를 API에서 가져오는 중... (2초 소요)
          </p>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">
          API 호출이 완료되면 실제 데이터가 표시됩니다!
        </p>
      </div>
    </div>
  );
}
