/**
 * settings.ts - createServerFn 데모용 Server Functions
 *
 * createServerFn으로 만든 함수는:
 * - 서버에서 실행됨 (DB 접근, 파일 시스템 등 가능)
 * - 클라이언트에서 호출하면 자동으로 HTTP 요청으로 변환됨
 */

import { createServerFn } from "@tanstack/react-start";

type Settings = {
  theme: "dark" | "light";
  language: string;
  notificationEnabled: boolean;
};

// 임시 저장소 (실제로는 DB)
let settingsData: Settings = {
  theme: "dark",
  language: "ko",
  notificationEnabled: true,
};

// GET 요청 - 데이터 조회
export const getSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    console.log("[Server] getSettings called");
    return settingsData;
  }
);

// POST 요청 - 데이터 변경
export const updateSettings = createServerFn({ method: "POST" })
  .inputValidator((d: Settings) => d)
  .handler(async ({ data }) => {
    console.log("[Server] updateSettings called", data);
    settingsData = { ...settingsData, ...data };
    return settingsData;
  });
