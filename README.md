# Next.js 서버 모니터링 대시보드

<div align="center">

## 🚀 실시간 서버 상태 모니터링 시스템

[![Azure Static Web Apps](https://img.shields.io/badge/Hosted%20on-Azure%20Static%20Web%20Apps-0078d4?style=for-the-badge&logo=microsoft-azure&logoColor=white)](https://status.salmakis.online)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-0055ff?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)

### ✨ [Live Demo](https://status.salmakis.online) | 🔧 [Source Code](https://github.com/jjyn0215/nextjs-test)

</div>

---

## 🌟 주요 기능

### 💫 **동적 서버 관리**
- **➕ 실시간 서버 추가**: 직관적인 모달 인터페이스로 새 서버 즉시 추가
- **✏️ 인라인 편집**: 클릭 한 번으로 서버 정보 수정
- **🗑️ 안전한 삭제**: 확인 모달로 실수 방지

### 📊 **실시간 모니터링**
- **🔄 자동 새로고침**: 30초마다 자동 상태 업데이트
- **⚡ 수동 새로고침**: 원클릭으로 즉시 상태 확인
- **📈 성능 메트릭**: HTTP 응답시간, 상태코드, RTT 표시

### 🎨 **현대적 UI/UX**
- **🌙 다크/라이트 모드**: 자동 시스템 테마 감지
- **📱 반응형 디자인**: 모든 디바이스에서 최적화
- **🎭 부드러운 애니메이션**: Framer Motion 기반 트랜지션

---

## 🏗️ 기술 스택

<div align="center">

| Frontend | Backend | Deployment | Styling |
|:--------:|:-------:|:----------:|:-------:|
| ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ![Azure](https://img.shields.io/badge/-Azure%20Static%20Web%20Apps-0078d4?style=flat-square&logo=microsoft-azure&logoColor=white) | ![Tailwind](https://img.shields.io/badge/-Tailwind%20CSS-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white) |
| TypeScript | API Routes | Azure CLI | Framer Motion |
| React 19 | DNS Monitoring | GitHub Actions | CSS Grid/Flexbox |

</div>

---

## 🚀 배포 정보

### 🌐 **Azure Static Web Apps에서 호스팅**

이 프로젝트는 **Microsoft Azure Static Web Apps**에서 호스팅되어 다음과 같은 이점을 제공합니다:

```bash
# Azure Developer CLI를 사용한 배포
azd auth login
azd init --template nextjs-monitoring-dashboard
azd up
```

### ⚡ **Azure의 장점**
- **🌍 글로벌 CDN**: 전 세계 어디서든 빠른 로딩
- **🔒 SSL/TLS**: 자동 HTTPS 인증서 관리
- **📈 자동 스케일링**: 트래픽에 따른 자동 확장
- **🔧 CI/CD**: GitHub Actions 자동 배포
- **💰 비용 효율**: 서버리스 아키텍처로 비용 최적화

---

## 🛠️ 로컬 개발 환경 설정

### 📋 **사전 요구사항**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### 🔧 **설치 및 실행**

```bash
# 1. 리포지토리 클론
git clone https://github.com/jjyn0215/nextjs-test.git
cd nextjs-test

# 2. 의존성 설치
npm install

# 3. 환경변수 설정 (선택사항)
cp .env.example .env.local
# 모니터링할 서버 정보 설정

# 4. 개발 서버 실행
npm run dev
```

### 🌐 **접속**
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

---

## 📖 사용 방법

### 1️⃣ **서버 추가**
```
우측 상단 "서버 추가" 버튼 → 서버명 & URL 입력 → 추가
```

### 2️⃣ **서버 편집**
```
서버 카드의 연필 아이콘 → 정보 수정 → 저장
```

### 3️⃣ **서버 삭제**
```
서버 카드의 휴지통 아이콘 → 확인 모달 → 삭제
```

### 4️⃣ **상태 새로고침**
```
"새로고침" 버튼 클릭 또는 30초 자동 갱신 대기
```

---

## 🏗️ 프로젝트 구조

```
nextjs-test/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 page.tsx              # 메인 페이지
│   │   ├── 📄 layout.tsx            # 루트 레이아웃
│   │   └── 📁 api/
│   │       ├── 📁 server-status/    # 서버 상태 API
│   │       └── 📁 check-single-server/ # 단일 서버 체크 API
│   ├── 📁 components/
│   │   ├── 📄 ServerManagement.tsx  # 메인 관리 컴포넌트
│   │   ├── 📄 ServerCard.tsx        # 서버 카드 UI
│   │   ├── 📄 AddServerModal.tsx    # 서버 추가 모달
│   │   ├── 📄 DeleteConfirmModal.tsx # 삭제 확인 모달
│   │   └── 📄 AutoRefresh.tsx       # 자동 새로고침
│   └── 📁 utils/
│       └── 📄 serverCheck.ts        # 서버 체크 유틸리티
├── 📄 package.json
├── 📄 next.config.ts
├── 📄 tailwind.config.js
└── 📄 Dockerfile
```

---

## 🤝 기여하기

1. 🍴 **Fork** 이 리포지토리
2. 🌿 **Feature 브랜치** 생성 (`git checkout -b feature/amazing-feature`)
3. 💾 **커밋** (`git commit -m 'Add some amazing feature'`)
4. 📤 **푸시** (`git push origin feature/amazing-feature`)
5. 🔍 **Pull Request** 생성

---

## 📜 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<div align="center">

### 💻 Made with ❤️ by [jjyn0215](https://github.com/jjyn0215)

**⭐ 이 프로젝트가 도움이 되었다면 별표를 눌러주세요!**

[![GitHub stars](https://img.shields.io/github/stars/jjyn0215/nextjs-test?style=social)](https://github.com/jjyn0215/nextjs-test/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jjyn0215/nextjs-test?style=social)](https://github.com/jjyn0215/nextjs-test/network/members)

</div>
