/**
 * _app/my-profile.tsx - 프로필 페이지
 *
 * URL: /my-profile
 * 레이아웃: _app.tsx가 적용됨 (Pathless Layout Route)
 */

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/my-profile')({
  component: Profile,
})

function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <div className="text-white font-semibold">John Doe</div>
            <div className="text-gray-400 text-sm">john@example.com</div>
          </div>
        </div>
        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  )
}
