/**
 * mypage/settings.tsx - 설정 페이지
 *
 * URL: /mypage/settings
 *
 * 데이터 흐름 데모:
 * 1. loader: SSR 시 초기 설정 데이터 로드 (서버에서 실행)
 * 2. server function: 설정 저장 (서버에서 실행)
 * 3. TanStack Query: 클라이언트에서 알림 목록 fetch (세밀한 캐시 제어)
 */

import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSettings,
  updateSettings,
  getNotifications,
} from '../../services/settings'

export const Route = createFileRoute('/mypage/settings')({
  // 1. loader: 페이지 진입 시 서버에서 실행
  loader: async () => {
    const settings = await getSettings()
    return { settings }
  },
  component: SettingsPage,
})

function SettingsPage() {
  const { settings } = Route.useLoaderData()
  const queryClient = useQueryClient()

  // 3. TanStack Query: 알림 목록 (클라이언트에서 fetch, 캐시 제어)
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    staleTime: 1000 * 30, // 30초간 fresh
  })

  // 2. server function mutation: 설정 저장
  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // 특정 쿼리만 갱신 (loader 전체 재실행 없이)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  const handleToggleNotification = () => {
    mutation.mutate({
      data: {
        ...settings,
        notificationEnabled: !settings.notificationEnabled,
      },
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">설정</h1>

      {/* loader 데이터 (SSR) */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wide mb-4">
          1. Loader (SSR)
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          페이지 진입 시 서버에서 로드됨
        </p>
        <div className="bg-slate-900 rounded p-3">
          <pre className="text-gray-300 text-sm">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </section>

      {/* server function mutation */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <h2 className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-4">
          2. Server Function (Mutation)
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          버튼 클릭 시 서버 함수 호출
        </p>
        <button
          onClick={handleToggleNotification}
          disabled={mutation.isPending}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {mutation.isPending
            ? '저장 중...'
            : `알림 ${settings.notificationEnabled ? '끄기' : '켜기'}`}
        </button>
        {mutation.isSuccess && (
          <span className="ml-3 text-green-400 text-sm">저장됨!</span>
        )}
      </section>

      {/* TanStack Query */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-purple-400 font-semibold text-sm uppercase tracking-wide mb-4">
          3. TanStack Query (Client Fetch)
        </h2>
        <p className="text-gray-400 text-sm mb-3">
          클라이언트에서 fetch, 30초 캐시
        </p>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => refetch()}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            새로고침
          </button>
          <span className="text-gray-500 text-xs">
            (loader 재실행 없이 이 쿼리만 갱신)
          </span>
        </div>
        <div className="bg-slate-900 rounded p-3">
          {isLoading ? (
            <p className="text-gray-500">로딩 중...</p>
          ) : (
            <ul className="space-y-2">
              {notifications?.map((n) => (
                <li
                  key={n.id}
                  className="text-gray-300 text-sm flex items-center gap-2"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${n.read ? 'bg-gray-600' : 'bg-cyan-400'}`}
                  />
                  {n.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 발표자용 힌트 */}
      <div className="mt-8 p-4 border border-dashed border-gray-700 rounded-lg">
        <p className="text-gray-500 text-sm mb-2">💡 데이터 흐름 비교:</p>
        <ul className="text-gray-600 text-xs space-y-1">
          <li>
            • <code className="text-cyan-400">loader</code>: SSR, 전체 페이지
            단위
          </li>
          <li>
            • <code className="text-orange-400">server function</code>: 서버
            실행, 직접 호출
          </li>
          <li>
            • <code className="text-purple-400">TanStack Query</code>: 클라이언트
            fetch, 세밀한 캐시 제어
          </li>
        </ul>
      </div>
    </div>
  )
}
