import { ActionFunctionArgs } from "@remix-run/node";
import { Suspense } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { getBaseURL } from "~/common/envs";
import { Container } from "~/common/types/Container";
import { ContainerDetail } from "~/common/types/ContainerDetail";
import Table from "~/components/containers/table/Table";

export async function loader() {
  const baseURL = getBaseURL();

  let containers: Container[] = [];

  // まず containers を取得
  const response = await fetch(baseURL + "/containers/json?all=true");
  containers = await response.json();

  // コンテナごとの詳細を取得
  const containerDetails: ContainerDetail[] = await Promise.all(
    containers.map(async (container) => {
      const res = await fetch(baseURL + `/containers/${container.Id}/json`);
      return res.json();
    })
  );

  return containerDetails; // containerDetails を直接返す
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
        <Table tableProps={containers} /> {/* コンテナの詳細を表示 */}
      </Suspense>
    </main>
  );
}
