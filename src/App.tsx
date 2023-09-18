import * as React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DragAndDrop from "./components/DragAndDrop";
import SortableList from "./components/SortableList";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/config",
		element: (
			<DragAndDrop
				onDragEnd={(result, provided) => {
					console.log({ result });
					console.log({ provided });
				}}
			>
				<SortableList
					droppableId={"config-sortable-symbols"}
					items={["AZN", "APL", "ABC", "XYZ"]}
				></SortableList>
			</DragAndDrop>
		),
	},
]);

function App() {
	return (
		// <React.StrictMode>
		<RouterProvider router={router} />
		// </React.StrictMode>
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
