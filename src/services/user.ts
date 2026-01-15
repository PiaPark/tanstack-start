/**
 * user.ts - 사용자 정보 Server Function
 */

import { createServerFn } from '@tanstack/react-start'
import { getRequest, setResponseHeader } from '@tanstack/react-start/server'

type UserData = {
  name: string
  profileImage: string
}

// 임시 저장소 (실제로는 DB)
let userData: UserData = {
  name: 'Pia',
  profileImage: 'https://avatars.githubusercontent.com/u/12345678',
}

// 쿠키에서 값 읽기
function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

// 사용자 정보 조회 (토큰이 있을 때만)
export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  const cookieHeader = request.headers.get('cookie')
  const token = getCookieValue(cookieHeader, 'auth_token')

  if (!token) {
    return null
  }

  return userData
})

// 로그인 (쿠키에 토큰 저장)
export const login = createServerFn({ method: 'POST' }).handler(async () => {
  const token = 'demo_token_' + Date.now()

  setResponseHeader(
    'Set-Cookie',
    `auth_token=${token}; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}; Path=/`
  )

  return userData
})

// 로그아웃 (쿠키 삭제)
export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  setResponseHeader(
    'Set-Cookie',
    'auth_token=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/'
  )

  return null
})

// 사용자 정보 수정
export const updateUser = createServerFn({ method: 'POST' })
  .inputValidator((d: UserData) => d)
  .handler(async ({ data }) => {
    userData = { ...userData, ...data }
    return userData
  })
