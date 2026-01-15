/**
 * ProfileBadge.tsx - 프로필 뱃지 컴포넌트
 */

import { Link } from '@tanstack/react-router'

type Props = {
  name: string
  profileImage: string
}

export function ProfileBadge({ name, profileImage }: Props) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 bg-slate-700/50 rounded-full pl-3 pr-1.5 py-1 hover:bg-slate-600/50 transition-colors"
    >
      <span className="text-gray-300 text-sm">{name}</span>
      <img
        src={profileImage}
        alt={name}
        className="w-7 h-7 rounded-full border border-slate-600"
      />
    </Link>
  )
}
