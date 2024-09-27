import { Alert } from "@material-tailwind/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import React, { Suspense, useEffect } from "react";
import { RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
import { getBaseURL } from "~/common/envs";
import { Container } from "~/common/types/container/Container";
import { ContainerDetail } from "~/common/types/container/ContainerDetail";
import Table from "~/components/containers/table/Table";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseURL = getBaseURL();

  let containers: Container[] = [];

  // まず containers を取得
  // fetchエラーをtry
  try {
    const response = await fetch(baseURL + "/containers/json?all=true");
    containers = await response.json();
  } catch (error) {
    return null;
  }

  // fetchエラーをtry
  try {
    // コンテナごとの詳細を取得
    const containerDetails: ContainerDetail[] = await Promise.all(
      containers.map(async (container) => {
        const res = await fetch(baseURL + `/containers/${container.Id}/json`);
        return res.json();
      })
    );

    // クエリを取り出す
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 検索Boxの入力値をURLクエリから取得
    const searchWord = searchParams.get("search");

    // 検索キーワード無いなら全てを返す
    if (searchWord == null || searchWord == "") {
      return containerDetails;
    }

    // 検索boxの入力値でフィルタリングしたコンテナ配列
    const filteredContainerDetails: ContainerDetail[] = [];

    for (const container of containerDetails) {
      // コンテナ名と一致していたら
      if (
        container.Name.toLocaleLowerCase().includes(
          searchWord.toLocaleLowerCase()
        )
      ) {
        filteredContainerDetails.push(container);
        // イメージ名と一致していたら
      } else if (
        container.Config.Image.toLocaleLowerCase().includes(
          searchWord.toLocaleLowerCase()
        )
      ) {
        filteredContainerDetails.push(container);
      }
    }
    // フィルタリングしたContainerDetailの配列を返却
    return filteredContainerDetails;
  } catch (error) {
    return null;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const baseURL = getBaseURL();

  const formData = await request.formData();
  const containerId = formData.get("containerId");
  const containerOperation = formData.get("container");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // nullであってはおかしいので早期return
  if (containerId == null) {
    return null;
  }

  // 生Response
  let result: Response | null = null;
  // 実際に返却する値(ステータスとステータステキストが入る)
  let res = null;
  // 返却するメッセージ
  let msg = null;
  // Alertで標示されて欲しい通知カテゴリ
  let alertType: "success" | "warning" | "error" | null = null;

  switch (containerOperation) {
    // コンテナ停止の場合
    case "stop":
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
    // コンテナ起動の場合
    case "start":
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
    // コンテナ削除の場合
    case "trash":
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

export default function Index() {
  const containers = useTypedLoaderData<typeof loader>();
  const data = useTypedActionData<typeof action>();

  // 通知の表示管理ステート
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>();
  const [errorMsg, setErrorMsg] = React.useState<string | null>();

  // 通知の表示管理副作用
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
