import { Metadata } from 'next';
import type { ServerStatusData } from './api/server-status/route';
import AutoRefresh from '@/components/AutoRefresh';
import StatusIndicator from '@/components/StatusIndicator';
import StatusBar from '@/components/StatusBar';
import ServerCard from '@/components/ServerCard';

export const metadata: Metadata = {
  title: process.env.APP_NAME || '서버 상태',
  description: '내서버에요잉',
  applicationName: process.env.APP_NAME,
  generator: `서버 모니터링 대시보드 v${process.env.APP_VERSION || '1.0.0'}`,
};

// 최대 30초마다 데이터 재검증 (SSR)
export const revalidate = 30

async function getServerStatus(): Promise<ServerStatusData> {
  // 실제 환경에서는 절대 URL 사용
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.URL;
  
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
          online: false,
          lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      ]
    };
  }
  
  return res.json();
}

export default async function HomePage() {
  const serverStatus = await getServerStatus();
  const lastCheckedTime = serverStatus.servers[0]?.lastChecked || '정보 없음';
  const onlineServersCount = serverStatus.servers.filter(s => s.online).length;
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-b from-background to-background/80">
      {/* 환경 변수에 설정된 간격으로 클라이언트 사이드에서 데이터 새로고침 */}
      <AutoRefresh interval={parseInt(process.env.CHECK_INTERVAL || '30', 10)} />
      
      {/* 상단 데코레이션 */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent -z-10" />
      
      <div className="w-full max-w-4xl">
        <div className="relative bg-gradient-to-b from-white to-white/90 dark:from-gray-800 dark:to-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 md:p-6 overflow-hidden">
          {/* 배경 블러 효과 - 더 작게 조정 */}
          <div className="absolute -top-64 -left-32 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-48 -right-24 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
          
          <header className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                서버 상태
              </h1>
              <StatusIndicator status={serverStatus.status} />
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </header>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
              <h2 className="text-lg font-semibold mb-2 md:mb-0">서비스 가용성 요약</h2>
              
              <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 dark:text-gray-300 mr-2">온라인 서비스</div>
                <div className="text-base font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  {onlineServersCount}/{serverStatus.servers.length}
                </div>
              </div>
            </div>
            
            <StatusBar 
              onlineCount={onlineServersCount} 
              totalCount={serverStatus.servers.length} 
              status={serverStatus.status} 
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serverStatus.servers.map((server, index) => (
              <ServerCard
                key={index}
                name={server.name}
                online={server.online}
                responseTime={server.responseTime}
                statusCode={server.statusCode}
                pingTime={server.pingTime}
              />
            ))}
          </div>
          
          <footer className="mt-6 pt-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div>마지막 확인: {lastCheckedTime}</div>
          </footer>
        </div>
      </div>
      
      {/* 하단 데코레이션 */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-purple-500/10 to-transparent -z-10" />
    </main>
  );
}
