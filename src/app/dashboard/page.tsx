import { Metadata } from 'next';
import type { ServerStatusData } from '../api/server-status/route';
import AutoRefresh from '@/components/AutoRefresh';

export const metadata: Metadata = {
  title: '서버 상태 대시보드',
  description: '서버 온라인 상태 확인 대시보드',
};

// 최대 30초마다 데이터 재검증 (SSR)
export const revalidate = 30;

async function getServerStatus(): Promise<ServerStatusData> {
  // 실제 환경에서는 절대 URL 사용
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  
  const res = await fetch(`${protocol}://${host}/api/server-status`, {
    cache: 'no-store', // 매번 새로운 데이터 가져오기
  });
  
  if (!res.ok) {
    // 에러 발생 시 기본값 반환
    return {
      status: 'offline',
      servers: [
        {
          name: '서버 상태 확인 불가',
          url: '',
          online: false,
          lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      ]
    };
  }
  
  return res.json();
}

export default async function DashboardPage() {
  const serverStatus = await getServerStatus();
  const lastCheckedTime = serverStatus.servers[0]?.lastChecked || '정보 없음';
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {/* 30초마다 클라이언트 사이드에서 데이터 새로고침 */}
      <AutoRefresh interval={30} />
      
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">서버 상태</h1>
        
        <div className="mb-8 text-center">
          {serverStatus.status === 'online' && (
            <div className="inline-flex items-center px-6 py-3 rounded-full text-white text-xl font-bold bg-green-500">
              <div className="w-4 h-4 rounded-full mr-3 bg-green-200 animate-pulse"></div>
              온라인
            </div>
          )}
          
          {serverStatus.status === 'degraded' && (
            <div className="inline-flex items-center px-6 py-3 rounded-full text-white text-xl font-bold bg-yellow-500">
              <div className="w-4 h-4 rounded-full mr-3 bg-yellow-200 animate-pulse"></div>
              성능 저하
            </div>
          )}
          
          {serverStatus.status === 'offline' && (
            <div className="inline-flex items-center px-6 py-3 rounded-full text-white text-xl font-bold bg-red-500">
              <div className="w-4 h-4 rounded-full mr-3 bg-red-200"></div>
              오프라인
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h2 className="font-medium mb-2">서비스 가용성 요약</h2>
          <div className="flex items-center justify-between text-sm">
            <div>온라인 서비스</div>
            <div className="font-medium">{serverStatus.servers.filter(s => s.online).length}/{serverStatus.servers.length}</div>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full mt-2">
            <div 
              className={`h-2 rounded-full ${
                serverStatus.status === 'online' ? 'bg-green-500' : 
                serverStatus.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(serverStatus.servers.filter(s => s.online).length / serverStatus.servers.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {serverStatus.servers.map((server, index) => (
            <div 
              key={index} 
              className="p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{server.name}</div>
                <div 
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${server.online ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {server.online ? '온라인' : '오프라인'}
                </div>
              </div>
              
              {/* 추가 정보 */}
              <div className="text-sm text-gray-500 mt-2">
                {server.url && (
                  <div className="truncate">URL: {server.url}</div>
                )}
                {server.responseTime !== undefined && (
                  <div>응답 시간: {server.responseTime}ms</div>
                )}
                {server.statusCode !== undefined && (
                  <div>상태 코드: {server.statusCode}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-4 text-sm text-gray-500 border-t">
          마지막 확인: {lastCheckedTime}
        </div>
      </div>
    </main>
  );
}
