import { Suspense } from 'react';

// 느린 컴포넌트 시뮬레이션
async function SlowServerStatus() {
  // 2초 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
      <h3 className="font-semibold text-green-800 dark:text-green-200">서버 상태</h3>
      <p className="text-green-600 dark:text-green-300">모든 서버가 정상 작동 중입니다.</p>
    </div>
  );
}

// 로딩 스켈레톤
function ServerStatusSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
    </div>
  );
}

export default function SuspenseExample() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Suspense 로딩 예시</h1>
      
      {/* 즉시 렌더링되는 컨텐츠 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="font-semibold text-blue-800 dark:text-blue-200">즉시 표시되는 정보</h2>
        <p className="text-blue-600 dark:text-blue-300">이 컨텐츠는 바로 보입니다.</p>
      </div>
      
      {/* Suspense로 감싸진 느린 컴포넌트 */}
      <Suspense fallback={<ServerStatusSkeleton />}>
        <SlowServerStatus />
      </Suspense>
      
      {/* 여러 개의 독립적인 Suspense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<ServerStatusSkeleton />}>
          <SlowServerStatus />
        </Suspense>
        <Suspense fallback={<ServerStatusSkeleton />}>
          <SlowServerStatus />
        </Suspense>
      </div>
    </div>
  );
}
