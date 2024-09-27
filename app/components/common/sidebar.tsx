import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { Link, useLocation } from "@remix-run/react";
import { BsGear } from "react-icons/bs";
import { CiServer } from "react-icons/ci";
import { GiWhaleTail } from "react-icons/gi";
import { GoContainer } from "react-icons/go";
import { IoGitNetworkOutline } from "react-icons/io5";
import { PiCube } from "react-icons/pi";

export default function Sidebar() {
    const location = useLocation();

    return (
        <Card className="h-[calc(100vh-2.5rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-gray-50/75 rounded-none">
            <div className="mb-2 flex items-center gap-4 p-4">
                <GiWhaleTail className="w-8 h-8" color="teal" />
                <Typography variant="h5" color="blue-gray">
                    Dockko
                </Typography>
            </div>

            <List>
                <Link to="/">
                    <ListItem selected={location.pathname === "/"}>
                        <ListItemPrefix>
                            <GoContainer className="h-5 w-5" />
                        </ListItemPrefix>
                        Containers
                    </ListItem>
                </Link>
                <Link to="/images">
                    <ListItem selected={location.pathname === "/images"}>
                        <ListItemPrefix>
                            <PiCube className="h-5 w-5" />
                        </ListItemPrefix>
                        Images
                    </ListItem>
                </Link>
                <Link to="/volumes">
                    <ListItem selected={location.pathname === "/volumes"}>
                        <ListItemPrefix>
                            <CiServer className="h-5 w-5" />
                        </ListItemPrefix>
                        Volumes
                    </ListItem>
                </Link>
                <Link to="/networks">
                    <ListItem selected={location.pathname === "/networks"}>
                        <ListItemPrefix>
                            <IoGitNetworkOutline className="h-5 w-5" />
                        </ListItemPrefix>
                        Networks
                    </ListItem>
                </Link>

                <hr className="my-2 border-blue-gray-100" />

                <Link to="/settings">
                    <ListItem selected={location.pathname === "/settings"}>
                        <ListItemPrefix>
                            <BsGear className="h-5 w-5" />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                </Link>
            </List>
        </Card>
    )
}