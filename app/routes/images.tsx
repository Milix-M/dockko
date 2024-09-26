import { useTypedLoaderData } from "remix-typedjson";
import { getBaseURL } from "~/common/envs";
import { Image } from "~/common/types/image/Image";
import Table from "~/components/images/table/Table";

export async function loader() {
  const baseURL = getBaseURL();

  let images: Image[] = [];

  // まず images を取得
  // fetchエラーをtry
  try {
    const response = await fetch(baseURL + "/system/df");
    const resJson = await response.json();
    images = resJson["Images"];
  } catch (error) {
    return null;
  }

  return images;
}

export default function Images() {
  const images = useTypedLoaderData<typeof loader>();

  return (
    <main>
      <h1 className="text-2xl font-bold m-6">Images</h1>
      {images != null ? (
        <Table tableProps={images}></Table>
      ) : (
        <div className="flex justify-center">
          <div>
            <h2 className="text-2xl font-bold text-center">
              イメージ一覧の取得に失敗しました
            </h2>
            <p className="text-center mb-4">
              接続設定で指定したDocker Serverとの通信が出来ませんでした。
            </p>
            <p className="text-center">
              接続に関する設定が正しいか確認してください。
              <br />
              Docker Engine APIと通信出来ることを確認してください。
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
