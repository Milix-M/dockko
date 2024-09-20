import { useLoaderData } from "@remix-run/react"
import electron from "~/electron.server"

export function loader() {
    return {
        userDataPath: electron.app.getPath("userData"),
    }
}

export default function Images() {
    const data = useLoaderData<typeof loader>()
    return (
        <main>
            <h1 className="text-2xl font-bold m-6">Images</h1>
        </main>
    )
}
