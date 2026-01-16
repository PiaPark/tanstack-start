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
          {/* App Area - Pathless Layout */}
          <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-cyan-400 font-semibold text-sm uppercase tracking-wide mb-4">
              App Area (Pathless Layout)
            </h2>
            <div className="space-y-3">
              <DemoLink
                to="/dashboard"
                title="/dashboard"
                hint="_app.tsx 레이아웃 적용"
              />
            </div>
          </section>

          {/* My Page Area */}
          <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-4">
              My Page Area (Layout Route)
            </h2>
            <div className="space-y-3">
              <DemoLink
                to="/mypage/profile"
                title="/mypage/profile"
                hint="mypage.tsx 레이아웃 적용"
              />
              <DemoLink
                to="/mypage/settings"
                title="/mypage/settings"
                hint="createServerFn 데모"
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
