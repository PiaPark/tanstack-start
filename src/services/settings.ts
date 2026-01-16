/**
 * settings.ts - 설정 관련 Server Functions
 *
 * 데이터 흐름 데모용:
 * - getSettings: loader에서 호출 (SSR)
 * - updateSettings: mutation에서 호출 (클라이언트 → 서버)
 * - getNotifications: TanStack Query에서 호출 (클라이언트 fetch)
 */

import { createServerFn } from '@tanstack/react-start'

type Settings = {
  theme: 'dark' | 'light'
  language: string
  notificationEnabled: boolean
}

type Notification = {
  id: number
  message: string
  read: boolean
  createdAt: string
}

// 임시 저장소
let settingsData: Settings = {
  theme: 'dark',
  language: 'ko',
  notificationEnabled: true,
}

let notificationsData: Notification[] = [
  { id: 1, message: '새로운 기능이 추가되었습니다', read: false, createdAt: '2024-01-15' },
  { id: 2, message: '시스템 점검 예정', read: true, createdAt: '2024-01-14' },
  { id: 3, message: '프로필이 업데이트되었습니다', read: false, createdAt: '2024-01-13' },
]

// 1. loader에서 사용 - SSR 시 호출
export const getSettings = createServerFn({ method: 'GET' }).handler(async () => {
  // 실제로는 DB에서 조회
  console.log('[Server] getSettings called')
  return settingsData
})

// 2. mutation에서 사용 - 클라이언트에서 호출
export const updateSettings = createServerFn({ method: 'POST' })
  .inputValidator((d: Settings) => d)
  .handler(async ({ data }) => {
    console.log('[Server] updateSettings called', data)
    settingsData = { ...settingsData, ...data }
    return settingsData
  })

// 3. TanStack Query에서 사용 - 클라이언트 fetch
export const getNotifications = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.log('[Server] getNotifications called')
    // 약간의 딜레이로 로딩 상태 확인용
    await new Promise((resolve) => setTimeout(resolve, 500))
    return notificationsData
  }
)
