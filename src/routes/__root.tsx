/**
 * __root.tsx - 루트 레이아웃
 *
 * 모든 페이지의 공통 껍데기 (HTML 구조)
 * - loader: 전역 데이터 (사용자 정보 등)
 * - shellComponent: SSR 시 HTML 문서 구조
 * - component: 공통 레이아웃
 * - TanStack Query: QueryClientProvider로 감싸서 전역 사용
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import { Header } from '../components/Header'
import { getUser } from '../services/user'
import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    const user = await getUser()
    return { user }
  },

  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Demo' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),

  component: RootLayout,

  shellComponent: RootDocument,
})

function RootLayout() {
  const { user } = Route.useLoaderData()
  const { queryClient } = Route.useRouteContext()

  return (
    <QueryClientProvider client={queryClient}>
      <Header user={user} />
      <Outlet />
    </QueryClientProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
