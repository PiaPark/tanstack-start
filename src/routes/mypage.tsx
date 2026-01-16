/**
 * mypage.tsx - 마이페이지 Layout Route
 *
 * URL: /mypage/*
 * - mypage/profile.tsx → /mypage/profile
 * - mypage/settings.tsx → /mypage/settings
 *
 * 사이드바로 마이페이지 메뉴를 제공합니다.
 */

import { Outlet, createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mypage")({
  component: MypageLayout,
});

function MypageLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* 마이페이지 사이드바 */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4">
        <div className="text-cyan-400 font-bold text-lg mb-6">My Page</div>
        <nav className="space-y-2">
          <Link
            to="/mypage/profile"
            className="block px-4 py-2 rounded hover:bg-slate-700 text-gray-300"
            activeProps={{
              className: "block px-4 py-2 rounded bg-slate-700 text-white",
            }}
          >
            프로필
          </Link>
          <Link
            to="/mypage/settings"
            className="block px-4 py-2 rounded hover:bg-slate-700 text-gray-300"
            activeProps={{
              className: "block px-4 py-2 rounded bg-slate-700 text-white",
            }}
          >
            설정
          </Link>
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
