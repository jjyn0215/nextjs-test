import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에러 테스트 - 서버 상태',
  description: '에러 페이지를 테스트하는 페이지',
};

// 에러를 발생시키는 컴포넌트
function ErrorTrigger({ type }: { type: string }) {
  if (type === 'throw') {
    throw new Error('테스트용 에러가 발생했습니다!');
  }
  
  if (type === 'async') {
    // 비동기 에러 시뮬레이션
    Promise.reject(new Error('비동기 에러 발생!'));
  }
  
  return null;
}

export default async function ErrorTestPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ type?: string }> 
}) {
  const params = await searchParams;
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">에러 페이지 테스트</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 404 에러 테스트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">404 에러 테스트</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            존재하지 않는 페이지로 이동하여 404 페이지를 확인해보세요.
          </p>
          <a 
            href="/non-existing-page"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            404 페이지 보기 →
          </a>
        </div>
        
        {/* 런타임 에러 테스트 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-300">런타임 에러 테스트</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            의도적으로 에러를 발생시켜 error.tsx를 확인해보세요.
          </p>
          <a 
            href="/error-test?type=throw"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            에러 발생시키기 →
          </a>
        </div>
        
        {/* 현재 페이지 상태 */}
        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">현재 페이지 상태</h3>
          <div className="space-y-2 text-sm">
            <p><strong>URL 파라미터:</strong> {JSON.stringify(params)}</p>
            <p><strong>에러 발생 여부:</strong> {params.type ? '예' : '아니오'}</p>
          </div>
          
          {/* 에러 트리거 */}
          {params.type && <ErrorTrigger type={params.type} />}
        </div>
      </div>
      
      {/* 설명 섹션 */}
      <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
          Next.js 에러 처리 파일들
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-blue-500 font-bold">📄</span>
            <div>
              <strong>error.tsx:</strong> 컴포넌트 에러 처리 (클라이언트 컴포넌트)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-500 font-bold">🔍</span>
            <div>
              <strong>not-found.tsx:</strong> 404 페이지 (존재하지 않는 경로)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-500 font-bold">🚨</span>
            <div>
              <strong>global-error.tsx:</strong> 전체 앱 레벨 에러 처리 (html, body 태그 포함)
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">⏳</span>
            <div>
              <strong>loading.tsx:</strong> 로딩 상태 UI (데이터 페칭 중)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
