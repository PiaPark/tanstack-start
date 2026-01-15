/**
 * _app.tsx - 일반 사용자용 레이아웃 (Pathless Layout)
 *
 * 파일명 앞의 '_'는 URL에 영향을 주지 않는 레이아웃을 의미합니다.
 * - _app/dashboard.tsx → /dashboard (O)
 * - _app/dashboard.tsx → /app/dashboard (X)
 *
 * 이 레이아웃 아래의 모든 페이지는 이 레이아웃을 공유합니다.
 *
 * loader: App 진입 시 앱 정보를 가져옴 (3초 딜레이 시뮬레이션)
 * pendingComponent: loader 실행 중 표시되는 로딩 UI
 */

import { Outlet, createFileRoute } from '@tanstack/react-router'
import { getAppInfo } from '../services/appConfig'

export const Route = createFileRoute('/_app')({
  loader: async () => {
    const appInfo = await getAppInfo()
    return { appInfo }
  },
  pendingComponent: AppLoading,
  component: AppLayout,
})

function AppLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-400">앱 정보 로딩 중...</p>
      </div>
    </div>
  )
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* 일반 사용자용 네비게이션 */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 font-semibold">User Area</span>
          <a href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </a>
          <a href="/my-profile" className="text-gray-300 hover:text-white">
            Profile
          </a>
        </div>
      </nav>

      {/* 하위 라우트가 여기에 렌더링됨 */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* 일반 사용자용 푸터 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-6 py-3 text-center text-gray-400 text-sm">
        © 2025 TanStack Start Demo
      </footer>
    </div>
  )
}
