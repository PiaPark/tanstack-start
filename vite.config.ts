/**
 * vite.config.ts - Vite 빌드 도구 설정 파일
 *
 * TanStack Start는 Vite를 기반으로 동작합니다.
 * 이 파일에서 플러그인들을 설정하여 SSR, 라우팅, 스타일링 등을 활성화합니다.
 */

import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite' // TanStack DevTools 플러그인
import { tanstackStart } from '@tanstack/react-start/plugin/vite' // TanStack Start 핵심 플러그인
import viteReact from '@vitejs/plugin-react' // React JSX 변환 플러그인
import viteTsConfigPaths from 'vite-tsconfig-paths' // tsconfig의 paths 별칭 지원
import tailwindcss from '@tailwindcss/vite' // Tailwind CSS 플러그인
import { nitro } from 'nitro/vite' // Nitro 서버 엔진 (배포 어댑터)

const config = defineConfig({
  plugins: [
    // TanStack DevTools - 개발 시 디버깅 도구
    devtools(),

    // Nitro - 범용 서버 엔진 (Cloudflare, Vercel, Node.js 등 다양한 환경 지원)
    nitro(),

    // TypeScript 경로 별칭 지원 (@ 같은 별칭 사용 가능)
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),

    // Tailwind CSS v4 플러그인
    tailwindcss(),

    // TanStack Start 핵심 플러그인 - SSR, Server Functions, 파일 기반 라우팅 등
    tanstackStart(),

    // React 플러그인 - JSX 변환, Fast Refresh 등
    viteReact(),
  ],
})

export default config
