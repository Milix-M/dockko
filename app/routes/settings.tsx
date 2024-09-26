import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React from "react";
import { useTypedLoaderData } from "remix-typedjson";
import {
  DOCKER_ENGINE_DEFAULT,
  DOCKER_ENGINE_VERSION_DEFAULT,
  loadConnectSettingValues,
} from "~/common/envs";
import { store } from "~/electron.server";

/**
 * Loader 設定値をelectron-storeを使用して読み込む
 * @returns electron-storeで取得した設定値
 */
export async function loader() {
  return loadConnectSettingValues();
}

/**
 * Action 設定値をelectron-storeを使用して保存する
 * @param param0 リクエストデータ
 * @returns null
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dockerEngineServer = formData.get("dockerEngineServer");
  const dockerApiVersion = formData.get("dockerApiVersion");

  // electron-storeで保存してあげる
  store.set("dockerEngineServer", dockerEngineServer);
  store.set("dockerApiVersion", dockerApiVersion);

  // 例外発生させないためにnullをreturn
  return null;
}

export default function Settings() {
  const settingsValues = useTypedLoaderData<typeof loader>();

  const [dockerEngineServer, setDockerEngineServer] = React.useState(
    settingsValues.DOCKER_ENGINE
  );
  const [dockerApiVersion, setDockerApiVersion] = React.useState(
    settingsValues.DOCKER_ENGINE_VERSION
  );

  return (
    <main>
      <h1 className="text-2xl font-bold m-6">Settings</h1>

      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none p-2">
          <h2 className="font-bold text-xl text-blue-gray-900">接続設定</h2>
        </CardHeader>
        {/* Actionを使用するためFormを使用 */}
        <Form replace method="post">
          <CardBody>
            <div className="flex justify-center items-center w-full gap-6">
              <div className="w-full">
                <span className="font-semibold text-md mb-1 block text-blue-gray-900">
                  Docker Engine Server
                </span>
                <span className="text-xs mb-2 block">
                  DockerエンジンのURLを指定します。
                  <br />
                  現在Unix
                  Socketには対応していないためHTTP接続での接続になります。
                </span>
                <Input
                  name="dockerEngineServer"
                  label="Server URL"
                  placeholder={DOCKER_ENGINE_DEFAULT}
                  value={dockerEngineServer}
                  crossOrigin={undefined}
                  onChange={(value) =>
                    setDockerEngineServer(value.target.value)
                  }
                />
              </div>
              <div className="w-full">
                <span className="font-semibold text-md mb-1 block text-blue-gray-900">
                  Docker API Version
                </span>
                <span className="text-xs mb-2 block">
                  DockerエンジンのAPIバージョンを指定します。
                  <br />
                  バージョン1.24以上を指定してください。
                </span>
                <Input
                  name="dockerApiVersion"
                  label="API Version"
                  placeholder={DOCKER_ENGINE_VERSION_DEFAULT}
                  value={dockerApiVersion}
                  crossOrigin={undefined}
                  onChange={(value) => setDockerApiVersion(value.target.value)}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-row-reverse">
            <Button color="teal" type="submit">
              保存
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </main>
  );
}
