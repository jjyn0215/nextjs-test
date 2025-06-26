import { NextResponse } from 'next/server';

// 서버 상태 타입 정의
export type ServerStatusData = {
  status: 'online' | 'degraded' | 'offline'; // 전체 상태 (모두 온라인/일부 온라인/모두 오프라인)
  servers: Array<{
    name: string;
    url: string;
    online: boolean;
    responseTime?: number; // 응답 시간(ms)
    statusCode?: number;   // HTTP 상태 코드
    lastChecked: string;
  }>;
};

// 서버 목록 정의 (실제 환경에서는 환경변수나 데이터베이스에서 관리할 수 있음)
const servers = [
  { 
    name: 'Proxmox', 
    url: 'https://mox.salmakis.online' // 테스트용 URL
  },
  { 
    name: 'Home Assistant', 
    url: 'https://hass.salmakis.online' // 테스트용 URL
  },
  { 
    name: 'Synology NAS', 
    url: 'https://nas.salmakis.online' // 테스트용 URL
  }
];

/**
 * HTTP 요청으로 서버 상태를 확인하는 함수
 */
async function checkServerStatus(serverUrl: string): Promise<{
  online: boolean;
  responseTime?: number;
  statusCode?: number;
}> {
  const startTime = Date.now();
  
  try {
    // 5초 타임아웃 설정
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(serverUrl, { 
      method: 'GET', // GET 요청으로 변경 (HEAD 요청이 에러 발생)
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    return {
      online: response.ok,
      responseTime,
      statusCode: response.status
    };
  } catch (error) {
    console.error(`서버 확인 중 오류 발생 (${serverUrl}):`, error);
    return {
      online: false
    };
  }
}

/**
 * 모든 서버의 상태를 확인하는 함수
 */
async function checkAllServers(): Promise<ServerStatusData> {
  const now = new Date();
  const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
  
  // 모든 서버 상태를 병렬로 확인
  const serverStatusPromises = servers.map(async (server) => {
    const status = await checkServerStatus(server.url);
    
    return {
      name: server.name,
      url: server.url,
      online: status.online,
      responseTime: status.responseTime,
      statusCode: status.statusCode,
      lastChecked: formattedDate,
    };
  });
  
  const serverList = await Promise.all(serverStatusPromises);
  
  // 전체 상태 계산
  const onlineCount = serverList.filter(server => server.online).length;
  let status: 'online' | 'degraded' | 'offline';
  
  if (onlineCount === serverList.length) {
    status = 'online';      // 모든 서버가 온라인
  } else if (onlineCount > 0) {
    status = 'degraded';    // 일부 서버만 온라인
  } else {
    status = 'offline';     // 모든 서버가 오프라인
  }
  
  return {
    status,
    servers: serverList
  };
}

export async function GET() {
  // 실제 HTTP 요청으로 서버 상태 확인
  const data = await checkAllServers();
  
  return NextResponse.json(data);
}
