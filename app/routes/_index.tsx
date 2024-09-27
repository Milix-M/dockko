import { Alert } from "@material-tailwind/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import React, { Suspense, useEffect } from "react";
import { RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
import { getBaseURL } from "~/common/envs";
import { Container } from "~/common/types/container/Container";
import { ContainerDetail } from "~/common/types/container/ContainerDetail";
import Table from "~/components/containers/table/Table";

/**
 * コンテナのデータを取得するローダー関数。
 *
 * @param {LoaderFunctionArgs} param0 - Remixのローダー引数
 * @returns {Promise<ContainerDetail[] | null>} コンテナの詳細情報を返す。エラー時はnullを返す。
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const baseURL = getBaseURL();

  let containers: Container[] = [];

  // コンテナのリストを取得する
  try {
    const response = await fetch(baseURL + "/containers/json?all=true");
    containers = await response.json();
  } catch (error) {
    // コンテナの取得に失敗した場合はnullを返す
    return null;
  }

  try {
    // 各コンテナの詳細情報を取得する
    const containerDetails: ContainerDetail[] = await Promise.all(
      containers.map(async (container) => {
        const res = await fetch(baseURL + `/containers/${container.Id}/json`);
        return res.json();
      })
    );

    // URLクエリパラメータから検索キーワードを取得
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const searchWord = searchParams.get("search");

    // 検索キーワードが無ければ全てのコンテナを返す
    if (searchWord == null || searchWord == "") {
      return containerDetails;
    }

    // 検索キーワードに基づいてコンテナをフィルタリング
    const filteredContainerDetails: ContainerDetail[] = [];

    for (const container of containerDetails) {
      if (
        container.Name.toLocaleLowerCase().includes(
          searchWord.toLocaleLowerCase()
        ) ||
        container.Config.Image.toLocaleLowerCase().includes(
          searchWord.toLocaleLowerCase()
        )
      ) {
        filteredContainerDetails.push(container);
      }
    }

    return filteredContainerDetails;
  } catch (error) {
    // エラーが発生した場合はnullを返す
    return null;
  }
}

/**
 * コンテナ操作を実行するアクション関数。
 *
 * @param {ActionFunctionArgs} param0 - Remixのアクション引数
 * @returns {Promise<{status: number, text: string, msg: string, alertType: string} | null>} 実行結果のメッセージやステータスを含むオブジェクトを返す
 */
export async function action({ request }: ActionFunctionArgs) {
  const baseURL = getBaseURL();
  const formData = await request.formData();
  const containerId = formData.get("containerId");
  const containerOperation = formData.get("container");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // コンテナIDが無い場合はnullを返す
  if (containerId == null) {
    return null;
  }

  let result: Response | null = null;
  let res = null;
  let msg = null;
  let alertType: "success" | "warning" | "error" | null = null;

  switch (containerOperation) {
    case "stop":
      // コンテナの停止操作
      result = await fetch(baseURL + `/containers/${containerId}/stop`, {
        method: "POST",
        headers,
      });

      if (result != null && result.status === 204) {
        msg = "コンテナの停止に成功しました";
        alertType = "success";
      } else {
        msg = "コンテナの停止に失敗しました";
        alertType = "error";
      }
      break;

    case "start":
      // コンテナの起動操作
      result = await fetch(baseURL + `/containers/${containerId}/start`, {
        method: "POST",
        headers,
      });

      if (result != null && result.status === 204) {
        msg = "コンテナの起動に成功しました";
        alertType = "success";
      } else {
        msg = "コンテナの起動に失敗しました";
        alertType = "error";
      }
      break;

    case "trash":
      // コンテナの削除操作
      result = await fetch(baseURL + `/containers/${containerId}?force=true`, {
        method: "DELETE",
        headers,
      });

      if (result != null && result.status === 204) {
        msg = "コンテナの削除に成功しました";
        alertType = "success";
      } else {
        msg = "コンテナの削除に失敗しました";
        alertType = "error";
      }
      break;
  }

  if (result != null) {
    res = {
      status: result.status,
      text: result.statusText,
      msg: msg,
      alertType: alertType,
    };
  }

  return res;
}

/**
 * メインのIndexコンポーネント
 *
 * @returns {JSX.Element} コンテナの一覧と操作結果を表示するJSX要素
 */
export default function Index() {
  const containers = useTypedLoaderData<typeof loader>();
  const data = useTypedActionData<typeof action>();

  // 通知の表示制御ステート
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>("");
  const [errorMsg, setErrorMsg] = React.useState<string | null>("");

  // アクション結果に基づいて通知を表示する
  useEffect(() => {
    if (data != null && data.alertType === "success") {
      setSuccessAlertOpen(true);
      setSuccessMsg(data?.msg);
      setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 3000);
    } else if (data != null && data.alertType === "error") {
      setErrorAlertOpen(true);
      setErrorMsg(data?.msg);
      setTimeout(() => {
        setErrorAlertOpen(false);
      }, 3000);
    }
  }, [data]);

  return (
    <main>
      <h1 className="text-2xl font-bold m-6">Containers</h1>

      <Suspense fallback={<div>Loading...</div>}>
        {containers != null ? (
          <Table tableProps={containers} />
        ) : (
          <div className="flex justify-center">
            <div>
              <h2 className="text-2xl font-bold text-center">
                コンテナ一覧の取得に失敗しました
              </h2>
              <p className="text-center mb-4">
                接続設定で指定したDocker Serverとの通信が出来ませんでした。
              </p>
              <p className="text-center">
                接続に関する設定が正しいか確認してください。
                <br />
                Docker Engine APIと通信出来ることを確認してください。
              </p>
            </div>
          </div>
        )}
      </Suspense>

      <div className="flex justify-center bottom-6 absolute left-1/2">
        <div className="flex flex-col gap-2">
          <Alert
            open={successAlertOpen}
            onClose={() => setSuccessAlertOpen(false)}
            color="green"
            icon={<RiCheckboxCircleLine className="h-6 w-6" />}
            animate={{
              mount: { y: 0 },
              unmount: { y: 15 },
            }}
          >
            {successMsg}
          </Alert>

          <Alert
            open={errorAlertOpen}
            onClose={() => setErrorAlertOpen(false)}
            color="red"
            icon={<RiErrorWarningLine className="h-6 w-6" />}
            animate={{
              mount: { y: 0 },
              unmount: { y: 15 },
            }}
          >
            {errorMsg}
          </Alert>
        </div>
      </div>
    </main>
  );
}
