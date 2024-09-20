import { useLoaderData } from "@remix-run/react"
import electron from "~/electron.server"

export function loader() {
    return {
        userDataPath: electron.app.getPath("userData"),
    }
}

export default function Settings() {
    const data = useLoaderData<typeof loader>()
    return (
        <main>
            <h1 className="text-2xl font-bold m-6">Settings</h1>
        </main>
    )
}
