/**
 * Header.tsx - 공통 헤더 컴포넌트
 *
 * user가 있으면 ProfileBadge, 없으면 로그인 버튼
 */

import { Link, useRouter } from "@tanstack/react-router";
import { ProfileBadge } from "./ProfileBadge";
import { login } from "../services/user";

type Props = {
  user: {
    name: string;
    profileImage: string;
  } | null;
};

export function Header({ user }: Props) {
  const router = useRouter();

  const handleLogin = async () => {
    await login();
    await router.invalidate();
  };

  return (
    <header className=" bg-slate-800/90 backdrop-blur border-b border-slate-700">
      <div className="flex items-center justify-between px-4 py-2">
        <Link
          to="/"
          className="text-white font-semibold hover:text-cyan-400 transition-colors"
        >
          Header
        </Link>
        {user ? (
          <ProfileBadge name={user.name} profileImage={user.profileImage} />
        ) : (
          <button
            onClick={handleLogin}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-lg text-sm transition-colors"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}
