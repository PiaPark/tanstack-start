/**
 * index.tsx - Demo Hub (루트 경로 '/')
 *
 * 테크톡 데모 런처 페이지
 * - 데모 진입 링크 모음
 * - 레이아웃 경계가 나뉜 걸 바로 체감
 */

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: DemoHub });

function DemoHub() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            TanStack Start Tech Talk Demo
          </h1>
          <p className="text-gray-400">
            Route-first / Layout Nesting / Data Responsibility
          </p>
        </header>

        {/* Demo Sections */}
        <div className="space-y-8">
          {/* App Area */}
          <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wide mb-4">
              App Area
            </h2>
            <div className="space-y-3">
              <DemoLink
                to="/dashboard"
                title="/dashboard"
                hint="상위 라우트(_app)가 레이아웃과 공통 UI를 책임"
              />
            </div>
          </section>

          {/* My Page Area */}
          <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-4">
              My Page Area
            </h2>
            <div className="space-y-3">
              <DemoLink
                to="/mypage/profile"
                title="/mypage/profile"
                hint="마이페이지 전용 레이아웃 (사이드바)"
              />
              <DemoLink
                to="/mypage/settings"
                title="/mypage/settings"
                hint="하위 라우트는 레이아웃 안에서 수정/소비"
              />
            </div>
          </section>

          {/* Server / Data Flow */}
          <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-purple-400 font-semibold text-sm uppercase tracking-wide mb-4">
              Server / Data Flow
            </h2>
            <div className="space-y-3">
              <DemoLink
                to="/demo/start/server-funcs"
                title="/demo/start/server-funcs"
                hint="라우트 단위로 서버 경계와 로딩이 묶임"
              />
              <DemoLink
                to="/demo/start/ssr"
                title="/demo/start/ssr"
                hint="SSR 모드별 데이터 흐름 비교"
              />
            </div>
          </section>
        </div>

        {/* Presenter Note */}
        <footer className="mt-12 text-center">
          <p className="text-gray-600 text-xs">
            💡 이 데모는 구조를 보기 위한 것이고, UI는 중요하지 않음
          </p>
          <p className="text-gray-600 text-xs mt-1">
            관찰 포인트: 라우트 파일 단위로 책임이 나뉘는지
          </p>
        </footer>
      </div>
    </div>
  );
}

function DemoLink({
  to,
  title,
  hint,
}: {
  to: string;
  title: string;
  hint: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-700/50 transition-colors group"
    >
      <code className="text-white font-mono text-sm group-hover:text-cyan-400 transition-colors">
        {title}
      </code>
      <span className="text-gray-500 text-xs max-w-[50%] text-right">
        {hint}
      </span>
    </Link>
  );
}
