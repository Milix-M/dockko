import { Card, CardHeader, Checkbox, IconButton, Input, Typography } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";
import { ContainerDetail } from "~/common/types/ContainerDetail";
import ContainerStopBtn from "./buttons/ContainerStopBtn";

type Prop = {
    tableProps: ContainerDetail[]
}

export default function Table({ tableProps }: Prop) {

    const tableHead = [
        {
            head: "Name",
            icon: <Checkbox crossOrigin={undefined} />,
        },
        {
            head: "Image",
        },
        {
            head: "Status",
        },
        {
            head: "CPU(%)",
        },
        {
            head: "Ports",
        },
        {
            head: "Actions",
        },
        {
            head: "",
        },
    ];

    return (
        <Card className="h-full w-full">
            <CardHeader
                floated={false}
                shadow={false}
                className="mb-2 rounded-none p-2"
            >
                <div className="w-full md:w-96">
                    <Input
                        label="Search"
                        icon={<IoMdSearch className="h-5 w-5" />} crossOrigin={undefined} />
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
                        ({ Name, Config, State, HostConfig, NetworkSettings, Id }, index) => {
                            const isLast = index === tableProps.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                            return (
                                <tr key={Name}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-1">
                                            <Checkbox crossOrigin={undefined} />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-semibold"
                                            >
                                                {/* 先頭に変なスラッシュ入るのでsubstringで回避 */}
                                                {Name.substring(1,)}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold break-all"
                                        >
                                            {Config.Image}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {State.Status}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {HostConfig.CpuPercent}%
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {Object.entries(NetworkSettings.Ports).map(([portKey, portValues]) => (
                                                <span key={portKey}>
                                                    {
                                                        portValues.map((port, index) => (
                                                            <span key={index} className="block">
                                                                {/* tcp or udpが入るので正規表現で消して表示 */}
                                                                {portKey.replace(new RegExp("/.*"), "") + ":" + port.HostPort}
                                                            </span>
                                                        ))
                                                    }
                                                </span>
                                            ))}


                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-2">
                                            {State.Running ? (
                                                <ContainerStopBtn variant="text" size="sm" className="h-4 w-4 text-gray-800" containerId={Id} />
                                            ) : (
                                                <div></div>
                                            )}

                                            <IconButton variant="text" size="sm">
                                                <TbDotsVertical
                                                    className="h-4 w-4 text-gray-800"
                                                />
                                            </IconButton>
                                            <IconButton variant="text" size="sm">
                                                <FaTrash className="h-4 w-4 text-gray-800" />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </Card >
    )
}