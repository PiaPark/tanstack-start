/**
 * mypage/settings.tsx - Server Function 데모
 *
 * URL: /mypage/settings
 *
 * createServerFn 데모:
 * - 클라이언트에서 서버 함수를 호출하면 자동으로 HTTP 요청으로 변환됨
 * - Network 탭에서 /_server 요청 확인 가능
 */

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getSettings, updateSettings } from "../../services/settings";

export const Route = createFileRoute("/mypage/settings")({
  component: SettingsPage,
});

type Settings = {
  theme: "dark" | "light";
  language: string;
  notificationEnabled: boolean;
};

function SettingsPage() {
  const [result, setResult] = useState<Settings | null>(null);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // 서버 함수 직접 호출 (GET)
  const handleGet = async () => {
    setLoadingGet(true);
    const data = await getSettings();
    setResult(data);
    setLoadingGet(false);
  };

  // 서버 함수 직접 호출 (POST) - 테마 토글
  const handleToggleTheme = async () => {
    setLoadingUpdate(true);
    // 현재 값의 반대로 토글
    const currentTheme = result?.theme ?? "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    const data = await updateSettings({
      data: {
        theme: newTheme,
        language: result?.language ?? "ko",
        notificationEnabled: result?.notificationEnabled ?? true,
      },
    });
    setResult(data);
    setLoadingUpdate(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">createServerFn 데모</h1>

      {/* 설명 */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <p className="text-gray-300 text-sm mb-4">
          <code className="text-green-400">createServerFn</code>으로 만든 함수는
          클라이언트에서 호출해도 <strong>자동으로 HTTP 요청</strong>으로
          변환됩니다.
        </p>
        <div className="bg-slate-900 rounded p-3 mb-4">
          <pre className="text-xs text-gray-400 overflow-x-auto">
            {`// services/settings.ts
export const getSettings = createServerFn({ method: 'GET' })
  .handler(async () => {
    // 이 코드는 서버에서만 실행됨
    return { theme: 'dark', notificationEnabled: true }
  })`}
          </pre>
        </div>
        <p className="text-gray-500 text-xs">
          버튼을 클릭하고 Network 탭에서 <code>/_server</code> 요청을
          확인해보세요.
        </p>
      </section>

      {/* 버튼들 */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleGet}
            disabled={loadingGet}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loadingGet ? "로딩..." : "getSettings() (GET)"}
          </button>
          <button
            onClick={handleToggleTheme}
            disabled={loadingUpdate}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loadingUpdate
              ? "로딩..."
              : `테마 변경 (POST) → ${result?.theme === "dark" ? "light" : "dark"}`}
          </button>
        </div>

        {/* 결과 */}
        {result && (
          <div>
            <p className="text-green-400 text-sm mb-2">서버 응답:</p>
            <div className="bg-slate-900 rounded p-3">
              <pre className="text-gray-300 text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </section>

      {/* Network 탭 가이드 */}
      <section className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30">
        <h2 className="text-cyan-400 font-semibold mb-4">Network 탭에서 확인하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded p-4">
            <div className="text-xs text-gray-500 mb-1">1. 요청 URL</div>
            <code className="text-yellow-400 text-sm">/_server/...</code>
            <p className="text-gray-500 text-xs mt-1">자동 생성된 서버 함수 엔드포인트</p>
          </div>
          <div className="bg-slate-900 rounded p-4">
            <div className="text-xs text-gray-500 mb-1">2. 요청 메서드</div>
            <div className="flex gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded text-xs">GET</span>
              <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs">POST</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">createServerFn의 method 옵션대로</p>
          </div>
          <div className="bg-slate-900 rounded p-4">
            <div className="text-xs text-gray-500 mb-1">3. 응답 탭</div>
            <code className="text-green-400 text-sm">{'{ "theme": "dark", ... }'}</code>
            <p className="text-gray-500 text-xs mt-1">순수 JSON 데이터 반환</p>
          </div>
          <div className="bg-slate-900 rounded p-4">
            <div className="text-xs text-gray-500 mb-1">4. 핵심 포인트</div>
            <p className="text-purple-400 text-sm">fetch 없이 함수 호출만!</p>
            <p className="text-gray-500 text-xs mt-1">RPC 스타일 서버 통신</p>
          </div>
        </div>
      </section>
    </div>
  );
}
