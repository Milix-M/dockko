import { useLoaderData } from "@remix-run/react"
import electron from "~/electron.server"

export function loader() {
    return {
        userDataPath: electron.app.getPath("userData"),
    }
}

export default function Networks() {
    const data = useLoaderData<typeof loader>()
    return (
        <main>
            <h1 className="text-2xl font-bold m-6">Networks</h1>
        </main>
    )
}
