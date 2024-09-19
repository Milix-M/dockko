import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { BsGear } from "react-icons/bs";
import { CiServer } from "react-icons/ci";
import { GiWhaleTail } from "react-icons/gi";
import { GoContainer } from "react-icons/go";
import { IoGitNetworkOutline } from "react-icons/io5";
import { PiCube } from "react-icons/pi";

export default function Sidebar() {
    return (
        <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-gray-100 rounded-none">
            <div className="mb-2 flex items-center gap-4 p-4">
                <GiWhaleTail className="w-8 h-8" color="teal" />
                <Typography variant="h5" color="blue-gray">
                    Dockko
                </Typography>
            </div>

            <List>
                <ListItem>
                    <ListItemPrefix>
                        <GoContainer className="h-5 w-5" />
                    </ListItemPrefix>
                    Containers
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PiCube className="h-5 w-5" />
                    </ListItemPrefix>
                    Images
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <CiServer className="h-5 w-5" />
                    </ListItemPrefix>
                    Volumes
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <IoGitNetworkOutline className="h-5 w-5" />
                    </ListItemPrefix>
                    Networks
                </ListItem>

                <hr className="my-2 border-blue-gray-50" />

                <ListItem>
                    <ListItemPrefix>
                        <BsGear className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
            </List>
        </Card>
    )
}