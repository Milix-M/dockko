const units = ["Byte", "KB", "MB", "GB"];

/**
 * ファイルサイズに応じて、ファイル容量の数値と単位を取得
 * 多めに表示するためにceilしている
 *
 * @export
 * @param {number} size
 * @param {number} [floating=1]
 * @returns
 * @returns {([number, string] | [])}
 */
export default function getFileSizeWithUnit(
  size: number,
  floating: number = 1
): [number, string] | [] {
  for (let i = 0; i < units.length; i += 1) {
    if (size < 1024 ** (i + 1)) {
      const floatingBase = 10 ** floating;
      const num =
        Math.ceil((size * floatingBase) / Math.max(1, 1024 ** i)) /
        floatingBase;
      return [num, units[i] as string];
    }
  }
  console.error("[getFileSizeWithUnit]: too large file size");
  return [];
}
