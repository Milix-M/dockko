import { Card, CardHeader, Checkbox, IconButton, Input, Typography } from "@material-tailwind/react";
import { FaStop } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { TbDotsVertical } from "react-icons/tb";

export default function Table() {
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

    const tableRows = [
        {
            number: "welcome-to-docker",
            customer: "docker/welcome",
            amount: "Running",
            issued: "1.4%",
            date: "52:52",
        },
        {
            number: "nginx",
            customer: "nginx:latest",
            amount: "Running",
            issued: "2%",
            date: "80:80",
        },
        {
            number: "apache2",
            customer: "apache:latest",
            amount: "Stopped",
            issued: "0%",
            date: "8080:8080",
        },
        {
            number: "devcontainer",
            customer: "local",
            amount: "Stopped",
            issued: "50%",
            date: "3222:3222",
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
            <table className="w-full min-w-max table-auto text-left">
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
                    {tableRows.map(
                        ({ number, customer, amount, issued, date }, index) => {
                            const isLast = index === tableRows.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                            return (
                                <tr key={number}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-1">
                                            <Checkbox crossOrigin={undefined} />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-semibold"
                                            >
                                                {number}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {customer}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {amount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {issued}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold"
                                        >
                                            {date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-2">
                                            <IconButton variant="text" size="sm">
                                                <FaStop className="h-4 w-4 text-gray-800" />
                                            </IconButton>
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