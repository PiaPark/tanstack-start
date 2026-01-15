/**
 * appConfig.ts - 앱 전역 설정 Server Function
 *
 * Server Functions는 보통 별도 파일로 분리해서 관리합니다.
 * - 재사용성: 여러 라우트에서 import해서 사용 가능
 * - 관심사 분리: 라우트 파일은 UI에만 집중
 */

import { createServerFn } from '@tanstack/react-start'

export const getAppConfig = createServerFn({ method: 'GET' }).handler(
  async () => {
    // 예시: 서버에서만 접근 가능한 환경변수나 설정
    return {
      appName: 'TanStack Start Demo',
      version: '1.0.0',
      serverTime: new Date().toISOString(),
    }
  }
)

// 앱 정보 조회 (3초 딜레이 시뮬레이션)
export const getAppInfo = createServerFn({ method: 'GET' }).handler(
  async () => {
    // 오래 걸리는 API 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return {
      name: 'TanStack Start Demo',
      version: '1.0.0',
      features: ['SSR', 'Server Functions', 'File-based Routing'],
    }
  }
)
