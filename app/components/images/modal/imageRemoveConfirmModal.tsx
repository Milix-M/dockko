import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Form } from "@remix-run/react";
import React from "react";

type Prop = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  removeTarget: string;
};

/**
 * イメージ削除確認モーダルコンポーネント。
 *
 * @param {boolean} open - モーダルの開閉状態を管理するフラグ
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpen - モーダルの開閉状態を切り替える関数
 * @param {string} removeTarget - 削除対象となるイメージのID
 * @returns {JSX.Element} イメージ削除確認モーダルのJSX要素
 */
export default function ImageRemoveConfirmModal({
  open,
  setOpen,
  removeTarget,
}: Prop) {
  /**
   * モーダルの開閉状態を切り替える関数。
   */
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        {/* モーダルのヘッダー部分 */}
        <DialogHeader>このイメージを削除しますか？</DialogHeader>

        {/* モーダルのボディ部分 */}
        <DialogBody>
          削除を実行すると元には戻せません。
          <br />
          イメージがコンテナにより使用されている場合は削除する事が出来ません。
        </DialogBody>

        {/* モーダルのフッター部分 */}
        <DialogFooter>
          {/* キャンセルボタン */}
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>キャンセル</span>
          </Button>

          {/* 削除実行フォーム */}
          <Form replace method="post">
            {/* 削除対象のイメージIDをフォームに隠しフィールドとして渡す */}
            <input type="hidden" value={removeTarget} name="imageId" />

            {/* 削除ボタン */}
            <Button
              variant="gradient"
              color="teal"
              onClick={handleOpen}
              type="submit"
              name="image"
              value="trash"
            >
              <span>削除</span>
            </Button>
          </Form>
        </DialogFooter>
      </Dialog>
    </>
  );
}
