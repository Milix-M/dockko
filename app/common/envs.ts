import { store } from "~/electron.server";

/**
 * 接続に関する値をelectron-storeを使用して読み込む
 * @returns DockerエンジンのURLとAPIバージョン
 */
export function loadConnectSettingValues() {
  const DOCKER_ENGINE = store.get(
    "dockerEngineServer",
    "http://127.0.0.1:2375"
  ) as string;
  const DOCKER_ENGINE_VERSION = store.get(
    "dockerApiVersion",
    "v1.47"
  ) as string;

  return {
    DOCKER_ENGINE,
    DOCKER_ENGINE_VERSION,
  };
}

/**
 * リクエスト先のURLを返却する
 * @returns リクエスト先URL
 */
export function getBaseURL() {
  const connectSettings = loadConnectSettingValues();

  return new URL(
    connectSettings.DOCKER_ENGINE_VERSION,
    connectSettings.DOCKER_ENGINE
  );
}
