/**
 * Local Storageに保存したデータを読み込む
 * @param key 読み出したいキー
 * @returns 設定値: string, 指定したキーに対応する値が無い場合undefined
 */
export function loadSettingsValue(key: string | undefined | null) {
  // null or undefinedなら早期リターン
  if (key == null) {
    return undefined;
  }

  // Local Storageから値を取ってくる
  const value = localStorage.getItem(key);

  // nullだと使い勝手悪い時があるのでundefinedにして返す
  if (value == null) {
    return undefined;
  } else {
    return value;
  }
}
