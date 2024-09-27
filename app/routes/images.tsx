import { Alert } from "@material-tailwind/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import React, { useEffect } from "react";
import { RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
import { getBaseURL } from "~/common/envs";
import { Image } from "~/common/types/image/Image";
import Table from "~/components/images/table/Table";

/**
 * @function loader
 * @description イメージ一覧を取得し、必要に応じて検索結果でフィルタリングします。
 * @param {LoaderFunctionArgs} param0 - リクエストオブジェクト
 * @returns {Promise<Image[] | null>} - フィルタリングされたイメージ一覧、または null（エラー時）
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const baseURL = getBaseURL();

  let images: Image[] = [];

  // まず images を取得
  // fetchエラーをtryでキャッチして処理
  try {
    const response = await fetch(baseURL + "/system/df");
    const resJson = await response.json();
    images = resJson["Images"];
  } catch (error) {
    // エラー発生時は null を返す
    return null;
  }

  // URLクエリパラメータを取得
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // 検索ボックスの入力値をURLクエリから取得
  const searchWord = searchParams.get("search");

  // 検索キーワードが無ければそのまま画像リストを返却
  if (searchWord == null || searchWord == "") {
    return images;
  }

  // 検索ボックスの入力値でフィルタリングしたイメージ配列
  const filteredImages: Image[] = [];

  for (const image of images) {
    // RepoTagsが存在してundefinedでないことを確認
    if (
      image.RepoTags != null &&
      image.RepoTags.length >= 1 &&
      image.RepoTags[0] != null
    ) {
      // イメージ名とタグ名を抽出
      const imageName = image.RepoTags[0].split(":")[0];
      const tagName = image.RepoTags[0].split(":").at(-1);

      // イメージ名と検索キーワードが一致するか確認
      if (
        imageName != null &&
        imageName.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      ) {
        filteredImages.push(image);
        // タグ名と一致していたら追加
      } else if (
        tagName != null &&
        tagName.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      ) {
        filteredImages.push(image);
      }
    }
  }

  // フィルタリングしたimageの配列を返却
  return filteredImages;
}

/**
 * @function action
 * @description イメージの削除など、フォームからの操作を処理します。
 * @param {ActionFunctionArgs} param0 - リクエストオブジェクト
 * @returns {Promise<{ status: number, text: string } | null>} - 操作結果のステータスとテキスト、または null（エラー時）
 */
export async function action({ request }: ActionFunctionArgs) {
  const baseURL = getBaseURL();

  const formData = await request.formData();
  const imageId = formData.get("imageId");
  const imageOperation = formData.get("image");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // imageIdがnullであれば不正なので、早期にreturn
  if (imageId == null) {
    return null;
  }

  let result: Response | null = null;

  // 操作の種類によって処理を分岐
  switch (imageOperation) {
    case "trash":
      result = await fetch(baseURL + `/images/${imageId}`, {
        method: "DELETE",
        headers,
      });
      break;
  }

  // 正しいResponseオブジェクトとして返す
  if (result != null) {
    return { status: result.status, text: result.statusText };
  } else {
    return null;
  }
}

/**
 * @function Images
 * @description イメージ一覧画面のコンポーネント。画像一覧の取得と削除アクションを管理します。
 * @returns {JSX.Element} - イメージ一覧と通知表示を含むメインコンポーネント
 */
export default function Images() {
  const images = useTypedLoaderData<typeof loader>();
  const data = useTypedActionData<typeof action>();

  // 通知の表示状態管理
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);

  // 副作用でアラートの表示管理を行う
  useEffect(() => {
    if (data?.status === 200) {
      setSuccessAlertOpen(true);
      setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 3000);
    } else if (data != null && data.status !== 200) {
      setErrorAlertOpen(true);
      setTimeout(() => {
        setErrorAlertOpen(false);
      }, 3000);
    }
  }, [data]);

  return (
    <main>
      <h1 className="text-2xl font-bold m-6">Images</h1>
      {images != null ? (
        // イメージ一覧をテーブルで表示
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

      {/* アラートの表示 */}
      <div className="flex justify-center bottom-6 absolute left-1/2">
        <div className="flex flex-col gap-2">
          <Alert
            open={successAlertOpen}
            onClose={() => setSuccessAlertOpen(false)}
            color="green"
            icon={<RiCheckboxCircleLine className="h-6 w-6" />}
            animate={{
              mount: { y: 0 },
              unmount: { y: 15 },
            }}
          >
            イメージの削除に成功しました
          </Alert>

          <Alert
            open={errorAlertOpen}
            onClose={() => setErrorAlertOpen(false)}
            color="red"
            icon={<RiErrorWarningLine className="h-6 w-6" />}
            animate={{
              mount: { y: 0 },
              unmount: { y: 15 },
            }}
          >
            イメージの削除に失敗しました
          </Alert>
        </div>
      </div>
    </main>
  );
}
