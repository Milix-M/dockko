import {
  Card,
  CardHeader,
  Checkbox,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Form, useRevalidator, useSubmit } from "@remix-run/react";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import { ContainerDetail } from "~/common/types/container/containerDetail";
import RefreshButton from "~/components/common/buttons/refreshButton";
import ContainerStartBtn from "../buttons/ContainerStartBtn";
import ContainerStopBtn from "../buttons/ContainerStopBtn";
import ContainerRemoveConfirmModal from "../modal/ContainerRemoveConfirmModal";

type Prop = {
  tableProps: ContainerDetail[];
};

/**
 * コンテナ一覧を表示するテーブルコンポーネント。
 *
 * @param {ContainerDetail[]} tableProps - 表示するコンテナの詳細情報の配列
 * @returns {JSX.Element} テーブルのJSX要素
 */
export default function Table({ tableProps }: Prop) {
  // モーダルの開閉を管理する状態
  const [removeConfirmModalOpen, setRemoveConfirmModalOpen] =
    React.useState(false);
  // 削除対象のコンテナIDを管理する状態
  const [removeTarget, setRemoveTarget] = React.useState("");
  const revalidator = useRevalidator();
  const submit = useSubmit();

  // テーブルのヘッダー
  const tableHead = [
    {
      head: "Name",
      icon: <Checkbox crossOrigin={undefined} />,
    },
    {
      head: "Image",
    },
    {
      head: "Status",
    },
    {
      head: "CPU(%)",
    },
    {
      head: "Ports",
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
      {/* コンテナ削除確認モーダル */}
      <ContainerRemoveConfirmModal
        open={removeConfirmModalOpen}
        setOpen={setRemoveConfirmModalOpen}
        removeTarget={removeTarget}
      />

      {/* コンテナ一覧を表示するカード */}
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="w-full md:w-96 flex items-center">
            {/* 検索フォーム */}
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

        {/* コンテナデータを表示するテーブル */}
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
              (
                { Name, Config, State, HostConfig, NetworkSettings, Id },
                index
              ) => {
                const isLast = index === tableProps.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                return (
                  <tr key={Name}>
                    {/* コンテナ名 */}
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Checkbox crossOrigin={undefined} />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {/* コンテナ名の先頭のスラッシュを削除 */}
                          {Name.substring(1)}
                        </Typography>
                      </div>
                    </td>

                    {/* イメージ名 */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold break-all"
                      >
                        {Config.Image}
                      </Typography>
                    </td>

                    {/* コンテナステータス */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {State.Status}
                      </Typography>
                    </td>

                    {/* CPU使用率 */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {HostConfig.CpuPercent}%
                      </Typography>
                    </td>

                    {/* ネットワークポート */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {Object.entries(NetworkSettings.Ports).map(
                          ([portKey, portValues]) => (
                            <span key={portKey}>
                              {portValues.map((port, index) => (
                                <span key={index} className="block">
                                  {/* TCPやUDPを削除してポート番号を表示 */}
                                  {portKey.replace(new RegExp("/.*"), "") +
                                    ":" +
                                    port.HostPort}
                                </span>
                              ))}
                            </span>
                          )
                        )}
                      </Typography>
                    </td>

                    {/* アクションボタン */}
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        {/* コンテナが実行中の場合は停止ボタン、停止中の場合は開始ボタン */}
                        {State.Running ? (
                          <ContainerStopBtn
                            variant="text"
                            size="sm"
                            className="h-4 w-4 text-gray-800"
                            containerId={Id}
                          />
                        ) : (
                          <ContainerStartBtn
                            variant="text"
                            size="sm"
                            className="h-4 w-4 text-gray-800"
                            containerId={Id}
                          />
                        )}

                        {/* 詳細メニューボタン */}
                        <IconButton variant="text" size="sm">
                          <TbDotsVertical className="h-4 w-4 text-gray-800" />
                        </IconButton>

                        {/* 削除ボタン */}
                        <IconButton
                          variant="text"
                          size="sm"
                          onClick={() => {
                            // 削除対象を設定してモーダルを表示
                            setRemoveTarget(Id);
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
