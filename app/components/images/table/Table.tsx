import {
  Card,
  CardHeader,
  Checkbox,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Form, useRevalidator, useSubmit } from "@remix-run/react";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import getFileSizeWithUnit from "~/common/getFileSizeWithUnit";
import { Image } from "~/common/types/image/Image";
import RefreshButton from "~/components/common/buttons/refreshButton";
import ImageRemoveConfirmModal from "../modal/imageRemoveConfirmModal";

type Prop = {
  tableProps: Image[];
};

/**
 * イメージ一覧表示用のテーブルコンポーネント。
 *
 * @param {Image[]} tableProps - 表示するイメージデータの配列
 * @returns {JSX.Element} テーブルのJSX要素
 */
export default function Table({ tableProps }: Prop) {
  // モーダルの開閉を管理するステート
  const [removeConfirmModalOpen, setRemoveConfirmModalOpen] =
    React.useState(false);
  // 削除対象のイメージIDを管理するステート
  const [removeTarget, setRemoveTarget] = React.useState("");
  const revalidator = useRevalidator();
  const submit = useSubmit();

  // テーブルヘッダーの項目定義
  const tableHead = [
    {
      head: "Name",
      icon: <Checkbox crossOrigin={undefined} />,
    },
    {
      head: "Tag",
    },
    {
      head: "Status",
    },
    {
      head: "Created",
    },
    {
      head: "Size",
    },
    {
      head: "Actions",
    },
    {
      head: "",
    },
  ];

  return (
    <>
      {/* イメージ削除確認モーダル */}
      <ImageRemoveConfirmModal
        open={removeConfirmModalOpen}
        setOpen={setRemoveConfirmModalOpen}
        removeTarget={removeTarget}
      />

      {/* テーブルカード */}
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="w-full md:w-96 flex items-center">
            {/* 検索システムのためのForm */}
            <Form
              onChange={(event) => {
                submit(event.currentTarget);
              }}
            >
              <Input
                name="search"
                label="Search"
                icon={<IoMdSearch className="h-5 w-5" />}
                crossOrigin={undefined}
              />
            </Form>

            {/* 再読み込みボタン */}
            <RefreshButton
              variant="text"
              size="sm"
              iconClassName="ml-2"
              buttonClassName="h-4 w-4 text-gray-800"
              revalidator={revalidator}
            />
          </div>
        </CardHeader>

        {/* イメージデータを表示するテーブル */}
        <table className="w-full min-w-fit table-auto text-left">
          <thead>
            <tr>
              {tableHead.map(({ head, icon }) => (
                <th key={head} className="border-b border-gray-300 p-4">
                  <div className="flex items-center gap-1">
                    {icon}
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableProps.map(
              ({ RepoTags, Containers, Created, Size, Id }, index) => {
                const isLast = index === tableProps.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                // 作成日時を「〜前」という形式で表示するために距離を計算
                const createdAgo = formatDistanceToNowStrict(
                  new Date(Created * 1000),
                  { addSuffix: true, locale: ja }
                );

                // ファイルサイズを単位付きで取得
                const unitCalculatedSize = getFileSizeWithUnit(Size);

                return (
                  <tr key={Id}>
                    {/* イメージ名の表示 */}
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Checkbox crossOrigin={undefined} />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold break-all"
                        >
                          {RepoTags ? RepoTags[0]?.split(":")[0] : "<None>"}
                        </Typography>
                      </div>
                    </td>
                    {/* イメージのタグ表示 */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold break-all"
                      >
                        {RepoTags ? RepoTags[0]?.split(":").at(-1) : "<None>"}
                      </Typography>
                    </td>
                    {/* イメージの状態表示 */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {Containers > 0 ? "used" : "unused"}
                      </Typography>
                    </td>
                    {/* 作成日時の表示 */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {createdAgo}
                      </Typography>
                    </td>
                    {/* イメージサイズの表示 */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {unitCalculatedSize.length == 0
                          ? "取得できませんでした"
                          : unitCalculatedSize}
                      </Typography>
                    </td>
                    {/* アクションボタン (削除など) */}
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        {/* 詳細メニュー */}
                        <IconButton variant="text" size="sm">
                          <TbDotsVertical className="h-4 w-4 text-gray-800" />
                        </IconButton>

                        {/* 削除ボタン */}
                        <IconButton
                          variant="text"
                          size="sm"
                          onClick={() => {
                            // 削除対象を設定
                            setRemoveTarget(Id);
                            // モーダルを表示
                            setRemoveConfirmModalOpen(true);
                          }}
                        >
                          <FaTrash className="h-4 w-4 text-gray-800" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
