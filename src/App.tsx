import * as React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ConfigForm, {
	loader as configFormLoader,
	action as configFormAction,
} from "./components/ConfigForm";
import ConfigList, {
	loader as configListLoader,
} from "./components/ConfigList";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/config",
		element: <ConfigList></ConfigList>,
		loader: configListLoader,
		// action: configListAction,
		children: [
			{
				path: "new",
				element: <ConfigForm></ConfigForm>,
				loader: configFormLoader,
				action: configFormAction,
			},
			{
				path: ":id",
				element: <ConfigForm></ConfigForm>,
				loader: configFormLoader,
				action: configFormAction,
			},
		],
	},
]);

function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}

function Home() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React {import.meta.env.VITE_TEST_VAR}</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
