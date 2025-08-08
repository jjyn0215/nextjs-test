# Next.js 서버 모니터링 대시보드

이 프로젝트는 실시간 서버 상태 모니터링을 위한 Next.js 15 기반 웹 애플리케이션입니다.

## 아키텍처 핵심 패턴

### 하이브리드 렌더링 전략
- **SSR**: `page.tsx`에서 초기 서버 상태를 `getServerStatus()`로 페치 (cache: 'no-store')
- **CSR**: `AutoRefresh` 컴포넌트가 `router.refresh()`로 주기적 갱신
- **환경별 API 호출**: 프로덕션에서는 `https://${process.env.URL}`, 개발에서는 `http://${host}`

### 모니터링 로직 (`src/app/api/server-status/route.ts`)
- **이중 검증**: HTTP GET 요청 + DNS 조회 기반 ping으로 각 서버 상태 확인
- **병렬 처리**: `Promise.all()`로 4개 서버 동시 체크
- **상태 집계**: `online`(모두 정상) → `degraded`(일부 정상) → `offline`(모두 실패)
- **타임아웃**: `API_TIMEOUT` 환경변수로 요청 시간 제한 (기본 1초)

### 환경변수 기반 설정
```bash
# 서버 목록 (1-4번까지 지원)
SERVER_1_NAME="서버명" SERVER_1_URL="https://example.com"
# 시스템 설정  
API_TIMEOUT=1000 CHECK_INTERVAL=30 URL=status.example.com
```

## 개발 워크플로우

### 필수 명령어
- `npm run dev`: Turbopack 개발 서버 (백그라운드 태스크 사용)
- `npm run build`: 프로덕션 빌드 (standalone 출력)
- `npm run lint`: ESLint + Next.js 플러그인

### Docker 배포
- **멀티스테이지**: deps → builder → runner로 최적화
- **Standalone 모드**: `next.config.ts`에서 `output: "standalone"` 설정
- **보안**: nextjs 사용자(uid:1001)로 실행

## 컴포넌트 설계 패턴

### 상태 중심 UI (`src/components/`)
```tsx
// 상태별 조건부 렌더링
const statusConfig = {
  online: { text: '온라인', bgColor: 'bg-gradient-to-r from-green-500...' },
  degraded: { text: '성능 저하', bgColor: 'bg-gradient-to-r from-yellow-400...' }
}
```

### Framer Motion 애니메이션
- `StatusIndicator`: scale + opacity 전환 효과
- 상태 변경 시 부드러운 시각적 피드백

### Tailwind 스타일링 컨벤션
- **그라데이션**: `bg-gradient-to-r from-{color}-500 to-{color}-600`
- **다크모드**: `dark:` 접두사로 자동 대응
- **블러 효과**: `filter blur-3xl opacity-10` 배경 장식

## 타입 시스템

### 공유 타입 정의
```typescript
// src/app/api/server-status/route.ts에서 export
export type ServerStatusData = {
  status: 'online' | 'degraded' | 'offline';
  servers: Array<{ name: string; online: boolean; ... }>
}
```

### 절대 경로 import
`@/components/ComponentName` (tsconfig.json paths 설정)

## 디버깅 패턴

### 에러 처리 전략
- API 실패 시 기본값 반환: `{ status: 'offline', servers: [fallback] }`
- 개별 서버 타임아웃 시 HTTP 실패해도 ping 결과는 표시
- 환경변수 누락 시 기본값 사용: `process.env.SERVER_1_NAME || 'Server 1'`

### 로깅 규칙
```typescript
console.error(`HTTP 확인 중 오류 발생 (${serverUrl}):`, error);
console.error(`Ping 확인 중 오류 발생 (${hostname}):`, error);
```

## 확장 지침

### 서버 추가
1. 환경변수에 `SERVER_5_NAME/URL` 추가
2. `route.ts`의 `servers` 배열에 객체 추가
3. UI는 자동으로 그리드 레이아웃 적용

### 상태 유형 확장
1. `ServerStatusData` 타입에 새 상태 추가
2. `StatusIndicator.tsx`의 `statusConfig` 객체 확장
3. `checkAllServers()` 로직에 상태 계산 규칙 추가
