/**
 * _app.tsx - Pathless Layout Route
 *
 * Pathless Layout: 언더스코어(_) prefix로 URL에 포함되지 않음
 * - _app/dashboard.tsx → /dashboard
 * - _app/my-profile.tsx → /my-profile
 *
 * loader: App 진입 시 앱 정보를 가져옴 (3초 딜레이 시뮬레이션)
 * pendingComponent: loader 실행 중 표시되는 로딩 UI
 * errorComponent: loader 에러 시 표시되는 에러 UI
 */

import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { getAppInfo } from "../services/appConfig";
import { AppLoading } from "../components/AppLoading";
import { AppError } from "../components/AppError";

export const Route = createFileRoute("/_app")({
  // loader: 라우트 진입 시점에 필요한 데이터를 준비한다.
  // (이 예제에서는 서버 함수 getAppInfo를 호출해 앱 정보를 가져온다.)
  loader: async () => {
    const appInfo = await getAppInfo();
    return { appInfo };
  },
  // pendingComponent: 데이터 로딩 중 표시할 UI를 정의한다.
  pendingComponent: AppLoading,
  // errorComponent: 로딩 과정에서 에러가 발생했을 때의 UI 경계를 정의한다.
  errorComponent: ({ error }) => <AppError message={error.message} />,
  // component: 실제로 화면을 렌더링하는 레이아웃 컴포넌트이다.
  component: AppLayout,
  // 캐시 설정
  // staleTime: 1000 * 60 * 5,  // 5분간 fresh (재요청 안 함)
  // gcTime: 1000 * 60 * 30,    // 30분간 메모리에 유지
});

function AppLayout() {
  // 준비된 데이터 사용
  const { appInfo } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 일반 사용자용 네비게이션 */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 font-semibold">{appInfo.name}</span>
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-white"
            activeProps={{ className: "text-cyan-400 font-semibold" }}
          >
            Dashboard
          </Link>
          <Link
            to="/my-profile"
            className="text-gray-300 hover:text-white"
            activeProps={{ className: "text-cyan-400 font-semibold" }}
          >
            Profile
          </Link>
        </div>
      </nav>

      {/* 하위 라우트가 여기에 렌더링됨 */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* 일반 사용자용 푸터 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 px-6 py-3 text-center text-gray-400 text-sm">
        {appInfo.name} v{appInfo.version}
      </footer>
    </div>
  );
}
