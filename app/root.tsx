import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react"
import { BsGear } from "react-icons/bs"
import { CiServer } from "react-icons/ci"
import { GiWhaleTail } from "react-icons/gi"
import { GoContainer } from "react-icons/go"
import { IoGitNetworkOutline } from "react-icons/io5"
import { PiCube } from "react-icons/pi"
import styles from "./tailwind.css"
import Sidebar from "./components/common/Sidebar"

export const meta: MetaFunction = () => [{ title: "Dockko" }]

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export default function App() {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Sidebar></Sidebar>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
