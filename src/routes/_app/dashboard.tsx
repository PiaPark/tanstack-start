/**
 * _app/dashboard.tsx - 대시보드 페이지
 *
 * URL: /dashboard
 * 레이아웃: _app.tsx가 적용됨 (Pathless Layout Route)
 */

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-gray-400 text-sm">Total Users</div>
          <div className="text-2xl font-bold text-cyan-400">1,234</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-gray-400 text-sm">Revenue</div>
          <div className="text-2xl font-bold text-green-400">$12,345</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="text-gray-400 text-sm">Active Sessions</div>
          <div className="text-2xl font-bold text-purple-400">89</div>
        </div>
      </div>
    </div>
  )
}
