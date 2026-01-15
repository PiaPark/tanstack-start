/**
 * _mypage/profile.tsx - 내 프로필 페이지
 *
 * URL: /mypage/profile
 * 레이아웃: _mypage.tsx의 MypageLayout이 적용됨
 *
 * 데이터 갱신 흐름:
 * 1. 저장 버튼 클릭 → updateUser() 서버 함수 호출
 * 2. router.invalidate() → __root.tsx의 loader 재실행
 * 3. getUser() 다시 호출 → 헤더의 ProfileBadge 갱신
 */

import { useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { updateUser } from '../../services/user'

export const Route = createFileRoute('/_mypage/profile')({
  component: MyProfile,
})

function MyProfile() {
  const router = useRouter()
  const [name, setName] = useState('Pia')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)

    // 1. 서버에 저장
    await updateUser({
      data: {
        name,
        profileImage: 'https://avatars.githubusercontent.com/u/12345678',
      },
    })

    // 2. __root.tsx의 loader 다시 실행 → 헤더 갱신
    await router.invalidate()

    setSaving(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">내 프로필</h1>
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
            />
            <p className="text-gray-500 text-xs mt-1">
              저장하면 오른쪽 상단 헤더에 반영됩니다
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white py-2 rounded-lg transition-colors"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      {/* 발표자용 힌트 */}
      <div className="mt-8 p-4 border border-dashed border-gray-700 rounded-lg">
        <p className="text-gray-500 text-sm">
          💡 <code className="text-cyan-400">router.invalidate()</code> 호출 시:
        </p>
        <p className="text-gray-600 text-xs mt-1">
          __root.tsx loader 재실행 → getUser() 호출 → 헤더 갱신 (페이지 새로고침 없음)
        </p>
      </div>
    </div>
  )
}
