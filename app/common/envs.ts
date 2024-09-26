import { store } from "~/electron.server";

export const DOCKER_ENGINE_DEFAULT = "http://127.0.0.1:2375";
export const DOCKER_ENGINE_VERSION_DEFAULT = "v1.47";

/**
 * 接続に関する値をelectron-storeを使用して読み込む
 * @returns DockerエンジンのURLとAPIバージョン
 */
export function loadConnectSettingValues() {
  const DOCKER_ENGINE = store.get(
    "dockerEngineServer",
    DOCKER_ENGINE_DEFAULT
  ) as string;
  const DOCKER_ENGINE_VERSION = store.get(
    "dockerApiVersion",
    DOCKER_ENGINE_VERSION_DEFAULT
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

  // URLとして正しくパースできるならそのままURLオブジェクトとしてインスタンス化して返却,
  // パース出来ないならデフォルトの接続先URLオブジェクトを返却
  if (
    URL.canParse(
      connectSettings.DOCKER_ENGINE_VERSION,
      connectSettings.DOCKER_ENGINE
    )
  ) {
    return new URL(
      connectSettings.DOCKER_ENGINE_VERSION,
      connectSettings.DOCKER_ENGINE
    );
  } else {
    return new URL(DOCKER_ENGINE_VERSION_DEFAULT, DOCKER_ENGINE_DEFAULT);
  }
}
