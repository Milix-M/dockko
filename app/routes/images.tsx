import { Alert } from "@material-tailwind/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import React, { useEffect } from "react";
import { RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
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
  if (searchWord == null || searchWord == "") {
    return images;
  }

  // 検索boxの入力値でフィルタリングしたイメージ配列
  const filteredImages: Image[] = [];

  for (const image of images) {
    // RepoTagsが存在してundefinedでないのを確認
    if (
      image.RepoTags != null &&
      image.RepoTags.length >= 1 &&
      image.RepoTags[0] != null
    ) {
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
  }

  // フィルタリングしたimageの配列を返却
  return filteredImages;
}

export async function action({ request }: ActionFunctionArgs) {
  const baseURL = getBaseURL();

  const formData = await request.formData();
  const imageId = formData.get("imageId");
  const imageOperation = formData.get("image");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // nullであってはおかしいので早期return
  if (imageId == null) {
    return null;
  }

  let result: Response | null = null;
  switch (imageOperation) {
    case "trash":
      result = await fetch(baseURL + `/images/${imageId}`, {
        method: "DELETE",
        headers,
      });
      break;
  }

  // そのまま返すとResponseオブジェクトじゃなくなるのでバグる
  if (result != null) {
    return { status: result.status, text: result.statusText };
  } else {
    return null;
  }
}

export default function Images() {
  const images = useTypedLoaderData<typeof loader>();
  const data = useTypedActionData<typeof action>();

  // 通知の表示管理ステート
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);

  // 通知の表示管理副作用
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
