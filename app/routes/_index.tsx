import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { DOCKER_ENGINE, DOCKER_ENGINE_VERSION } from "~/common/envs";
import { Container } from "~/common/interfaces";
import Table from "~/components/containers/Table";

export async function loader() {
	return (await fetch(new URL(DOCKER_ENGINE_VERSION, DOCKER_ENGINE) + "/containers/json")).json();
}

export default function Index() {
	const containers: Promise<Container[]> = useLoaderData<typeof loader>();

	return (
		<main>
			<h1 className="text-2xl font-bold m-6">Containers</h1>

			<Suspense>
				<Await resolve={containers}>
					{(containerdata) => <Table tableProps={containerdata} />}
				</Await>
			</Suspense>
		</main>
	)
}
