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
  // 실제 HTTP 요청으로 서버 상태 확인
  const data = await checkAllServers();

  return NextResponse.json(data);
}
