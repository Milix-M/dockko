import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@material-tailwind/react";
import React from "react";
import { loadSettingsValue } from "~/common/settings";

/**
 * 接続設定のデータをLocal Storageに保存する
 * @param serverURL "dockerEngineServer"キーで保存する値
 * @param apiVersion "dockerApiVersion"キーで保存する値
 */
function handleSave(serverURL: string | undefined, apiVersion: string | undefined) {
    if (serverURL != null) {
        localStorage.setItem("dockerEngineServer", serverURL);
    }
    if (apiVersion != null) {
        localStorage.setItem("dockerApiVersion", apiVersion);
    }
}

export default function Settings() {
    const [dockerEngineServer, setDockerEngineServer] = React.useState(loadSettingsValue("dockerEngineServer"));
    const [dockerApiVersion, setDockerApiVersion] = React.useState(loadSettingsValue("dockerApiVersion"))

    return (
        <main>
            <h1 className="text-2xl font-bold m-6">Settings</h1>

            <Card className="h-full w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none p-2"
                >
                    <h2 className="font-bold text-xl text-blue-gray-900">接続設定</h2>
                </CardHeader>
                <CardBody>
                    <div className="flex justify-center items-center w-full gap-6">
                        <div className="w-full">
                            <span className="font-semibold text-md mb-1 block text-blue-gray-900">Docker Engine Server</span>
                            <span className="text-xs mb-2 block">DockerエンジンのURLを指定します。<br />現在Unix Socketには対応していないためHTTP接続での接続になります。</span>
                            <Input
                                label="Server URL" placeholder="http://127.0.0.1:2375" value={dockerEngineServer} crossOrigin={undefined} onChange={(value) => setDockerEngineServer(value.target.value)} />
                        </div>
                        <div className="w-full">
                            <span className="font-semibold text-md mb-1 block text-blue-gray-900">Docker API Version</span>
                            <span className="text-xs mb-2 block">DockerエンジンのAPIバージョンを指定します。<br />バージョン1.24以上を指定してください。</span>
                            <Input
                                label="API Version" placeholder="v1.47" value={dockerApiVersion} crossOrigin={undefined} onChange={(value) => setDockerApiVersion(value.target.value)} />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-row-reverse">
                    <Button color="teal" onClick={() => handleSave(dockerEngineServer, dockerApiVersion)}>
                        保存
                    </Button>
                </CardFooter>
            </Card >
        </main>
    )
}
