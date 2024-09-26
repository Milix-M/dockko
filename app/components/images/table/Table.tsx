import {
  Card,
  CardHeader,
  Checkbox,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Form, useRevalidator, useSubmit } from "@remix-run/react";
import { formatDistanceToNowStrict } from "date-fns";
import { ja } from "date-fns/locale";
import { FaTrash } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import { Image } from "~/common/types/image/Image";
import RefreshButton from "~/components/common/buttons/refreshButton";

type Prop = {
  tableProps: Image[];
};

export default function Table({ tableProps }: Prop) {
  const revalidator = useRevalidator();
  const submit = useSubmit();

  const tableHead = [
    {
      head: "Name",
      icon: <Checkbox crossOrigin={undefined} />,
    },
    {
      head: "Tag",
    },
    {
      head: "Status",
    },
    {
      head: "Created",
    },
    {
      head: "Size",
    },
    {
      head: "Actions",
    },
    {
      head: "",
    },
  ];

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="w-full md:w-96 flex items-center">
            {/* 検索システムのためのForm */}
            <Form
              onChange={(event) => {
                submit(event.currentTarget);
              }}
            >
              <Input
                name="search"
                label="Search"
                icon={<IoMdSearch className="h-5 w-5" />}
                crossOrigin={undefined}
              />
            </Form>

            {/* 再読み込みボタン */}
            <RefreshButton
              variant="text"
              size="sm"
              iconClassName="ml-2"
              buttonClassName="h-4 w-4 text-gray-800"
              revalidator={revalidator}
            />
          </div>
        </CardHeader>
        <table className="w-full min-w-fit table-auto text-left ">
          <thead>
            <tr>
              {tableHead.map(({ head, icon }) => (
                <th key={head} className="border-b border-gray-300 p-4">
                  <div className="flex items-center gap-1">
                    {icon}
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableProps.map(
              ({ RepoTags, Containers, Created, Size, Id }, index) => {
                const isLast = index === tableProps.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                // 現在の時間との距離をエポック秒から計算した結果
                const createdAgo = formatDistanceToNowStrict(
                  new Date(Created * 1000),
                  { addSuffix: true, locale: ja }
                );

                return (
                  <tr key={Id}>
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Checkbox crossOrigin={undefined} />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold break-all"
                        >
                          {RepoTags ? RepoTags[0]?.split(":")[0] : "<None>"}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold break-all"
                      >
                        {RepoTags ? RepoTags[0]?.split(":").at(-1) : "<None>"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {Containers > 0 ? "used" : "unused"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {createdAgo}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {Size}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-2">
                        <IconButton variant="text" size="sm">
                          <TbDotsVertical className="h-4 w-4 text-gray-800" />
                        </IconButton>

                        <IconButton variant="text" size="sm">
                          <FaTrash className="h-4 w-4 text-gray-800" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
