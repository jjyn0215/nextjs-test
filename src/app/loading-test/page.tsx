import Link from 'next/link';

export default function LoadingTestPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Loading UI 테스트</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 사용자 프로필 테스트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">API 호출 예시</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            실제 API 호출을 시뮬레이션하는 페이지입니다.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
            <li>🌐 2초간 API 호출 시뮬레이션</li>
            <li>⏳ fetch 완료까지 loading.tsx 표시</li>
            <li>📊 완료 후 사용자 데이터 표시</li>
          </ul>
          <Link 
            href="/user-profile"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
          >
            사용자 프로필 →
          </Link>
        </div>
        
        {/* 느린 페이지 테스트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-300">느린 페이지 테스트</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            서버에서 3초간 데이터를 가져오는 페이지입니다.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
            <li>✅ loading.tsx가 표시됩니다</li>
            <li>⏱️ 3초 후 페이지가 렌더링됩니다</li>
            <li>🔄 새로고침하면 다시 로딩됩니다</li>
          </ul>
          <Link 
            href="/slow-server"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            느린 페이지로 이동 →
          </Link>
        </div>
        
        {/* 빠른 페이지 테스트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">빠른 페이지 테스트</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            데이터 페칭 없이 즉시 렌더링되는 페이지입니다.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
            <li>❌ loading.tsx가 표시되지 않습니다</li>
            <li>⚡ 즉시 페이지가 렌더링됩니다</li>
            <li>🚀 바로 상호작용 가능합니다</li>
          </ul>
          <Link 
            href="/fast-page"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            빠른 페이지로 이동 →
          </Link>
        </div>
        
        {/* Suspense 예시 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Suspense 예시</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            부분적으로 로딩 상태를 보여주는 페이지입니다.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
            <li>🔄 일부만 로딩 상태</li>
            <li>📱 즉시 상호작용 가능한 부분</li>
            <li>⏱️ 지연 로딩되는 부분</li>
          </ul>
          <Link 
            href="/suspense-example"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Suspense 예시 →
          </Link>
        </div>
        
        {/* 클라이언트 로딩 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-purple-500">
          <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">클라이언트 로딩</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            사용자 상호작용에 따른 로딩 상태입니다.
          </p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
            <li>🖱️ 버튼 클릭 시 로딩</li>
            <li>🔄 클라이언트 사이드 로딩</li>
            <li>⌨️ 사용자 액션 기반</li>
          </ul>
          <Link 
            href="/client-loading"
            className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
          >
            클라이언트 로딩 →
          </Link>
        </div>
      </div>
      
      {/* 설명 섹션 */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">언제 loading.tsx가 표시될까요?</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✅</span>
            <span>서버 컴포넌트에서 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">await</code> 키워드로 데이터를 가져올 때</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✅</span>
            <span>페이지 네비게이션 중 서버에서 렌더링하는 동안</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 font-bold">✅</span>
            <span>동적 라우트에서 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">generateStaticParams</code>에 없는 경로 접근 시</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 font-bold">❌</span>
            <span>클라이언트 컴포넌트의 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">useEffect</code> 내부 데이터 페칭 시 (별도 상태 관리 필요)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 font-bold">❌</span>
            <span>정적 컨텐츠만 있는 페이지 (즉시 렌더링)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
