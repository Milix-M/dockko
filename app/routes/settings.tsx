import { Card, CardHeader, Input } from "@material-tailwind/react"
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

            <Card className="h-full w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none p-2"
                >
                    <h2 className="font-bold text-xl">接続設定</h2>
                </CardHeader>
                <div className="mt-2 px-6 py-4">
                    <div className="flex justify-center items-center w-full gap-6">
                        <div className="w-full">
                            <span className="font-semibold text-md mb-1 block">Docker Engine Server</span>
                            <Input
                                label="Server URL" placeholder="http://127.0.0.1:2375" value={"http://127.0.0.1:2375"} crossOrigin={undefined} />
                        </div>
                        <div className="w-full">
                            <span className="font-semibold text-md mb-1 block">Docker API Version</span>
                            <Input
                                label="API Version" placeholder="v1.47" value={"v1.47"} crossOrigin={undefined} />
                        </div>
                    </div>
                </div>
            </Card >
        </main>
    )
}
