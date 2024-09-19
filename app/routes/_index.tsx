import { useLoaderData } from "@remix-run/react"
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
			<></>
		</main>
	)
}
