export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center gap-4">
        {/* 스피너 */}
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        
        {/* 로딩 텍스트 */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">로딩 중...</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">서버 상태를 확인하고 있습니다</p>
        </div>
        
        {/* 펄스 애니메이션 */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
