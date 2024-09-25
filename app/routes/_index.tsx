import { ActionFunctionArgs } from "@remix-run/node";
import { Suspense } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { DOCKER_ENGINE, DOCKER_ENGINE_VERSION } from "~/common/envs";
import { Container } from "~/common/types/Container";
import { ContainerDetail } from "~/common/types/ContainerDetail";
import Table from "~/components/containers/Table";

export async function loader() {
	let containers: Container[] = [];

	// まず containers を取得
	const response = await fetch(new URL(DOCKER_ENGINE_VERSION, DOCKER_ENGINE) + "/containers/json?all=true");
	containers = await response.json();

	// コンテナごとの詳細を取得
	const containerDetails: ContainerDetail[] = await Promise.all(
		containers.map(async (container) => {
			const res = await fetch(new URL(DOCKER_ENGINE_VERSION, DOCKER_ENGINE) + `/containers/${container.Id}/json`);
			return res.json();
		})
	);

	return containerDetails;  // containerDetails を直接返す
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const containerId = formData.get('containerId')
	const containerOperation = formData.get('container')

	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	// nullであってはおかしいので早期return
	if (containerId == null) {
		return null
	}

	let result: Response | undefined = undefined;
	if (containerOperation === "stop") {
		result = await fetch(new URL(DOCKER_ENGINE_VERSION, DOCKER_ENGINE) + `/containers/${containerId}/stop`, { method: 'POST', headers });
	} else if (containerOperation === "start") {
		result = await fetch(new URL(DOCKER_ENGINE_VERSION, DOCKER_ENGINE) + `/containers/${containerId}/start`, { method: 'POST', headers });
	}

	return result;
}

export default function Index() {
	const containers = useTypedLoaderData<typeof loader>();

	return (
		<main>
			<h1 className="text-2xl font-bold m-6">Containers</h1>

			<Suspense fallback={<div>Loading...</div>}>
				<Table tableProps={containers} />  {/* コンテナの詳細を表示 */}
			</Suspense>
		</main>
	);
}
