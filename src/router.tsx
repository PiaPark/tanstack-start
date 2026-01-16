/**
 * router.tsx - 라우터 설정 파일
 *
 * 이 파일은 TanStack Router의 핵심 설정을 담당합니다.
 * - routeTree.gen.ts는 파일 기반 라우팅에서 자동 생성되는 파일입니다.
 * - 라우터 인스턴스를 생성하고 앱 전체에서 사용할 수 있도록 내보냅니다.
 * - TanStack Query 설정: QueryClient를 라우터 context로 전달
 */

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; // src/routes/ 기반 자동 생성

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { queryClient },
  });

  return router;
};

/**
 * Note: getRouter()는 직접 호출하지 않음
 *
 * tanstackStart() 플러그인 → getRouter() 자동 호출 → router 생성 → 앱에 주입
 */
