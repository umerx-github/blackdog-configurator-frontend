import React from "react";
import ReactDOM from "react-dom/client";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./ErrorPage.tsx";
import StrategiesList from "./routes/StrategiesList.tsx";
import StrategyDetail from "./routes/StrategyDetail.tsx";
import { ViewState } from "./Interfaces/viewState";
import Home from "./routes/Home.tsx";

const blackdogConfiguratorBackendScheme =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_SCHEME ?? "";
const blackdogConfiguratorBackendHost =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_HOST ?? "";
const blackdogConfiguratorBackendPort =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_PORT ?? "";
const blackdogConfiguratorBackendPath =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_PATH ?? "";

const blackdogConfiguratorBackendBaseUrl = `${blackdogConfiguratorBackendScheme}://${blackdogConfiguratorBackendHost}${
	"" === blackdogConfiguratorBackendPort
		? ""
		: `:${blackdogConfiguratorBackendPort}`
}${blackdogConfiguratorBackendPath}`;

const blackdogConfiguratorClient = new BlackdogConfiguratorClient.ClientImpl(
	blackdogConfiguratorBackendBaseUrl
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "home",
				element: <Home />,
				errorElement: <ErrorPage />,
			},
			{
				path: "strategy",
				element: (
					<StrategiesList
						blackdogConfiguratorClient={blackdogConfiguratorClient}
					/>
				),
				errorElement: <ErrorPage />,
				children: [],
			},
			{
				path: "strategy/read/:strategyId",
				element: (
					<StrategyDetail
						blackdogConfiguratorClient={blackdogConfiguratorClient}
						viewState={ViewState.read}
					/>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "strategy/edit/:strategyId",
				element: (
					<StrategyDetail
						blackdogConfiguratorClient={blackdogConfiguratorClient}
						viewState={ViewState.edit}
					/>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: "strategy/add",
				element: (
					<StrategyDetail
						blackdogConfiguratorClient={blackdogConfiguratorClient}
						viewState={ViewState.add}
					/>
				),
				errorElement: <ErrorPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
