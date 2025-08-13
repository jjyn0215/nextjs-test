import { NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";

// DNS 조회를 프로미스로 변환
const lookup = promisify(dns.lookup);

// 서버 상태 타입 정의
export type ServerStatusData = {
  status: "online" | "degraded" | "offline"; // 전체 상태 (모두 온라인/일부 온라인/모두 오프라인)
  servers: Array<{
    name: string;
    // url 필드는 보안상의 이유로 클라이언트에 전송하지 않음
    online: boolean;
    responseTime?: number; // 응답 시간(ms)
    statusCode?: number; // HTTP 상태 코드
    pingTime?: number; // ICMP Ping 시간(ms)
    lastChecked: string;
  }>;
};

// 환경변수에서 서버 목록 가져오기
const servers = [
  {
    name: process.env.SERVER_1_NAME || "Server 1",
    url: process.env.SERVER_1_URL || "https://example.com",
  },
  {
    name: process.env.SERVER_2_NAME || "Server 2",
    url: process.env.SERVER_2_URL || "https://example.com",
  },
  {
    name: process.env.SERVER_3_NAME || "Server 3",
    url: process.env.SERVER_3_URL || "https://example.com",
  },
  {
    name: process.env.SERVER_4_NAME || "Server 4",
    url: process.env.SERVER_4_URL || "https://example.com",
  },
];

// 캐시 관련 변수들
let cachedData: ServerStatusData | null = null;
let lastUpdate = 0;
let isUpdating = false;
const CACHE_DURATION = 30000; // 30초 캐시 유효 시간
const UPDATE_INTERVAL = 60000; // 60초마다 백그라운드 업데이트

// 백그라운드에서 주기적으로 서버 상태를 업데이트하는 함수
async function updateServerStatusInBackground() {
  if (isUpdating) {
    console.log('이미 업데이트 중입니다.');
    return;
  }

  isUpdating = true;
  try {
    console.log('백그라운드 서버 상태 업데이트 시작:', new Date().toISOString());
    const newData = await checkAllServers();
    cachedData = newData;
    lastUpdate = Date.now();
    console.log('백그라운드 서버 상태 업데이트 완료:', new Date().toISOString());
  } catch (error) {
    console.error('백그라운드 서버 상태 업데이트 실패:', error);
  } finally {
    isUpdating = false;
  }
}

// 서버 시작 시 즉시 한 번 실행하고 주기적 업데이트 설정
let updateIntervalId: NodeJS.Timeout | null = null;

// 초기화 함수
function initializeBackgroundMonitoring() {
  if (!cachedData && !isUpdating) {
    console.log('초기 서버 상태 체크 시작');
    updateServerStatusInBackground();
  }

  // 이미 인터벌이 설정되어 있지 않다면 새로 설정
  if (!updateIntervalId) {
    updateIntervalId = setInterval(updateServerStatusInBackground, UPDATE_INTERVAL);
    console.log(`백그라운드 모니터링 시작 (${UPDATE_INTERVAL / 1000}초 간격)`);
  }
}

// 모듈 로드 시 초기화
initializeBackgroundMonitoring();

/**
 * HTTP 요청으로 서버 상태를 확인하는 함수
 */
/**
 * URL에서 호스트명을 추출하는 함수
 */
function extractHostname(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    console.error(`URL 파싱 오류 (${url}):`, error);
    return "";
  }
}

/**
 * Ping으로 서버 응답 시간을 확인하는 함수
 */
async function pingServer(hostname: string): Promise<{
  success: boolean;
  pingTime: number | undefined;
}> {
  const startTime = Date.now();

  try {
    // DNS 조회를 통해 호스트가 존재하는지 확인
    await lookup(hostname);
    const pingTime = Date.now() - startTime;

    return {
      success: true,
      pingTime,
    };
  } catch (error) {
    console.error(`Ping 확인 중 오류 발생 (${hostname}):`, error);
    return {
      success: false,
      pingTime: undefined,
    };
  }
}

async function checkServerStatus(serverUrl: string): Promise<{
  online: boolean;
  responseTime?: number;
  statusCode?: number;
  pingTime?: number;
}> {
  const startTime = Date.now();
  const hostname = extractHostname(serverUrl);
  let pingResult = {
    success: false,
    pingTime: undefined as number | undefined,
  };

  // 호스트명이 추출되었으면 ping 시도
  if (hostname) {
    pingResult = await pingServer(hostname);
  }

  try {
    // 환경 변수에서 타임아웃 설정 가져오기 (기본값: 5000ms)
    const timeout = parseInt(process.env.API_TIMEOUT || "1000", 10);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(serverUrl, {
      method: "GET", // GET 요청으로 변경 (HEAD 요청이 에러 발생)
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      online: response.ok,
      responseTime,
      statusCode: response.status,
      pingTime: pingResult.pingTime,
    };
  } catch (error) {
    console.error(`HTTP 확인 중 오류 발생 (${serverUrl}):`, error);
    // HTTP 연결은 실패했지만 ping이 성공했을 수 있음
    return {
      online: false,
      pingTime: pingResult.pingTime,
    };
  }
}

/**
 * 모든 서버의 상태를 확인하는 함수
 */
async function checkAllServers(): Promise<ServerStatusData> {
  const now = new Date();
  // 시간을 오전/오후 형식으로 포맷팅
  const hours = now.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  const hour12 = hours % 12 || 12; // 12시간제로 변환 (0시는 12로 표시)
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now
    .getDate()
    .toString()
    .padStart(2, "0")} ${ampm} ${hour12}:${minutes}:${seconds}`;

  // 모든 서버 상태를 병렬로 확인
  const serverStatusPromises = servers.map(async (server) => {
    const status = await checkServerStatus(server.url);

    return {
      name: server.name,
      // URL은 보안상의 이유로 클라이언트에게 전송하지 않음
      online: status.online,
      responseTime: status.responseTime,
      statusCode: status.statusCode,
      pingTime: status.pingTime,
      lastChecked: formattedDate,
    };
  });

  const serverList = await Promise.all(serverStatusPromises);

  // 전체 상태 계산
  const onlineCount = serverList.filter((server) => server.online).length;
  let status: "online" | "degraded" | "offline";

  if (onlineCount === serverList.length) {
    status = "online"; // 모든 서버가 온라인
  } else if (onlineCount > 0) {
    status = "degraded"; // 일부 서버만 온라인
  } else {
    status = "offline"; // 모든 서버가 오프라인
  }

  return {
    status,
    servers: serverList,
  };
}

export async function GET() {
  // 캐시된 데이터가 있고 아직 유효한 경우
  if (cachedData && (Date.now() - lastUpdate) < CACHE_DURATION) {
    console.log('캐시된 데이터 반환:', new Date().toISOString());
    return NextResponse.json(cachedData);
  }

  // 캐시가 없거나 만료된 경우, 즉시 새로운 데이터 확인
  console.log('캐시 만료 또는 없음, 새로운 데이터 확인:', new Date().toISOString());
  const data = await checkAllServers();
  
  // 새로운 데이터로 캐시 업데이트
  cachedData = data;
  lastUpdate = Date.now();

  return NextResponse.json(data);
}
