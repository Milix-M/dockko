import { useLoaderData } from "@remix-run/react"
import Table from "~/components/containers/Table"
import electron from "~/electron.server"

export function loader() {
	return {
		userDataPath: electron.app.getPath("userData"),
	}
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	return (
		<main>
			<h1 className="text-2xl font-bold m-6">Containers</h1>
			<Table></Table>
		</main>
	)
}
