import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Suspense } from "react";
import { useTypedLoaderData } from "remix-typedjson";
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

    // 検索boxの入力値でフィルタリングしたコンテナ配列
    const filteredContainerDetails: ContainerDetail[] = [];

    for (const container of containerDetails) {
      // 検索キーワード無いなら全てを返す
      if (searchWord == null) {
        return containerDetails;
        // 検索キーワードがあるなら
      } else {
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

        // フィルタリングしたContainerDetailの配列を返却
        return filteredContainerDetails;
      }
    }

    return containerDetails; // containerDetails を直接返す
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

  let result: Response | null = null;
  switch (containerOperation) {
    case "stop":
      result = await fetch(baseURL + `/containers/${containerId}/stop`, {
        method: "POST",
        headers,
      });
      break;
    case "start":
      result = await fetch(baseURL + `/containers/${containerId}/start`, {
        method: "POST",
        headers,
      });
      break;
    case "trash":
      result = await fetch(baseURL + `/containers/${containerId}?force=true`, {
        method: "DELETE",
        headers,
      });
      break;
  }

  return result;
}

export default function Index() {
  const containers = useTypedLoaderData<typeof loader>();

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
    </main>
  );
}
