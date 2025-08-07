<!-- Use this file to provide workspace-specific custom instructions to Copilot. More details: https://code.visualstudio.com/docs/copilot/copilot-customization -->
# Next.js 서버 상태 모니터링 웹앱 안내

이 프로젝트는 Next.js 15(App Router, TypeScript) + Tailwind CSS + ESLint 기반의 서버 모니터링 대시보드입니다. 주요 특징:

## 프로젝트 구조
- `src/app/`
	- `layout.tsx`, `page.tsx`: 애플리케이션 레이아웃 및 메인 페이지
	- `api/server-status/route.ts`: 서버 상태 수집 API (Route Handler)
- `src/components/`
	- `AutoRefresh.tsx`: 클라이언트 사이드 자동 갱신 컴포넌트
	- `ServerCard.tsx`, `StatusBar.tsx`, `StatusIndicator.tsx`: 상태 표시용 재사용 컴포넌트
- 전역 설정 파일
	- `tailwind.config.js`, `postcss.config.mjs`
	- `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`
	- `src/app/globals.css`

## 데이터 흐름
1. `route.ts` 내 `checkAllServers()` 함수가 DNS, HTTP, Ping 검사를 수행하여 `ServerStatusData` 반환
2. `page.tsx`의 `getServerStatus()`가 `fetch('http://localhost:3000/api/server-status', { cache: 'no-store' })` 호출
3. 응답을 JSON으로 파싱하여 컴포넌트에 전달
4. `revalidate` 설정(`export const revalidate = 3600`)으로 SSR 캐시 제어
5. `AutoRefresh` 컴포넌트(`CHECK_INTERVAL` 환경 변수)로 클라이언트 리프레시 주기 설정

## 주요 환경 변수
- `SERVER_{n}_URL`, `SERVER_{n}_NAME` (n=1~4): 모니터링 대상 서버 목록
- `API_TIMEOUT` (ms, default: 5000)
- `CHECK_INTERVAL` (초, default: 30)
- `APP_NAME`, `APP_VERSION`, `URL` (호스트 기준 URL)
- `NODE_ENV` 기준 프러덕션/개발 API 호출 로직 (주석 처리된 예시 참조)

## 개발 워크플로우
- 로컬 개발: `npm run dev` (Turbopack, background)
- 빌드: `npm run build`
- 린트: `npm run lint` (ESLint + Next.js 플러그인)
- 포맷터/프리셋: 프로젝트에 Prettier 미설정 (ESLint auto-fix 사용)

## 코드 컨벤션 및 패턴
- TypeScript strict 모드 기반 타입 선언 권장
- `@/` 절대 경로 alias 사용 (tsconfig.json `paths`에 매핑)
- 컴포넌트 단위 재사용: `src/components/` 폴더 참조
- 스타일링: Tailwind 유틸리티 클래스 + dark mode (`dark:` 접두사) 활용
- 에러 핸들링: API 내부에서 `try/catch`로 로컬 기본값 반환 패턴

## 자주 변경되는 포인트
- 모니터링 대상 서버 추가/변경: `src/app/api/server-status/route.ts`의 `servers` 배열
- UI 업데이트: `src/components/` 하위 컴포넌트 수정
- 전역 레이아웃 수정: `src/app/layout.tsx`

---

위 내용에 대해 피드백이나 추가 설명이 필요하면 알려주세요.
