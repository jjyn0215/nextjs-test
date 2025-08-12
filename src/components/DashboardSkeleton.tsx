function ServerCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* 서버 이름 스켈레톤 */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>

      {/* 상태 정보 스켈레톤 */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-10"></div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* 헤더 스켈레톤 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14 animate-pulse"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* 타이틀 스켈레톤 */}
        <div className="h-9 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-6 animate-pulse"></div>

        {/* 카드 그리드 스켈레톤 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ServerCardSkeleton key={i} />
          ))}
        </div>

        {/* 추가 정보 스켈레톤 */}
        <div className="mt-8 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
        </div>
      </main>
    </div>
  );
}
