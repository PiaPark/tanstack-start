/**
 * _mypage/notifications.tsx - 알림 설정 페이지
 *
 * URL: /mypage/notifications
 * 레이아웃: _mypage.tsx의 MypageLayout이 적용됨
 */

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_mypage/notifications')({
  component: MyNotifications,
})

function MyNotifications() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">알림 설정</h1>
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300">이메일 알림</div>
              <div className="text-gray-500 text-sm">중요 소식을 이메일로 받습니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-600 peer-checked:bg-cyan-500 rounded-full peer-focus:ring-2 peer-focus:ring-cyan-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300">푸시 알림</div>
              <div className="text-gray-500 text-sm">브라우저 푸시 알림을 받습니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-600 peer-checked:bg-cyan-500 rounded-full peer-focus:ring-2 peer-focus:ring-cyan-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-300">마케팅 수신</div>
              <div className="text-gray-500 text-sm">이벤트, 프로모션 정보를 받습니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-600 peer-checked:bg-cyan-500 rounded-full peer-focus:ring-2 peer-focus:ring-cyan-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
