import { LoaderFunctionArgs } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import { getBaseURL } from "~/common/envs";
import { Image } from "~/common/types/image/Image";
import Table from "~/components/images/table/Table";

export async function loader({ request }: LoaderFunctionArgs) {
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

  // クエリを取り出す
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // 検索Boxの入力値をURLクエリから取得
  const searchWord = searchParams.get("search");

  // 検索キーワード無ければ絞り込みしない
  if (searchWord == null) {
    return images;
  }

  // 検索boxの入力値でフィルタリングしたイメージ配列
  const filteredImages: Image[] = [];

  for (const image of images) {
    // RepoTagsが存在してundefinedでないのを確認
    if (image.RepoTags.length >= 1 && image.RepoTags[0] != null) {
      const imageName = image.RepoTags[0].split(":")[0];
      const tagName = image.RepoTags[0].split(":").at(-1);

      // イメージ名と一致していたら
      if (
        imageName != null &&
        imageName.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      ) {
        filteredImages.push(image);
        // タグ名と一致していたら
      } else if (
        tagName != null &&
        tagName.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      ) {
        filteredImages.push(image);
      }
    }

    // フィルタリングしたimageの配列を返却
    return filteredImages;
  }
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
