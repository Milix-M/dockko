import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react"
import Sidebar from "./components/common/Sidebar"
import styles from "./tailwind.css"

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
				<div className="h-10 bg-teal-50 draggable flex justify-center items-center">
					<div className="flex items-center gap-2">
						<p className="font-semibold text-sm text-blue-gray-900">Dockko</p>
					</div>
				</div>

				<div className="flex">
					<Sidebar></Sidebar>
					<div className="px-6 py-2 w-full bg-gray-50/75">
						<Outlet />
					</div>
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
