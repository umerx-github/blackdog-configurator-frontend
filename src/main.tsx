import React from "react";
import ReactDOM from "react-dom/client";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage.tsx";
import StrategiesList, {
	loader as strategiesListLoader,
} from "./routes/StrategiesList.tsx";
import StrategyDetail, {
	loader as strategyDetailLoader,
	action as strategyDetailCreate,
} from "./routes/StrategyDetail.tsx";
import { ViewState } from "./Interfaces/viewState";
import Home from "./routes/Home.tsx";
import StrategyTemplateList from "./routes/StrategyTemplateList.tsx";

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

export const blackdogConfiguratorClient =
	new BlackdogConfiguratorClient.ClientImpl(
		blackdogConfiguratorBackendBaseUrl
	);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <Home />,
				errorElement: <ErrorPage />,
				children: [],
			},
			{
				path: "strategy",
				children: [
					{
						path: "",
						element: (
							<StrategiesList
								blackdogConfiguratorClient={
									blackdogConfiguratorClient
								}
							/>
						),
						loader: strategiesListLoader,
						errorElement: <ErrorPage />,
					},
					{
						path: ":strategyId",
						children: [
							{
								path: "",
								element: (
									<StrategyDetail
										blackdogConfiguratorClient={
											blackdogConfiguratorClient
										}
										viewState={ViewState.view}
									/>
								),
								loader: strategyDetailLoader,
								errorElement: <ErrorPage />,
							},
							{
								path: "edit",
								element: (
									<StrategyDetail
										blackdogConfiguratorClient={
											blackdogConfiguratorClient
										}
										viewState={ViewState.edit}
									/>
								),
								loader: strategyDetailLoader,
								errorElement: <ErrorPage />,
							},
							{
								path: "strategyTemplate",
								element: (
									<StrategyTemplateList
										blackdogConfiguratorClient={
											blackdogConfiguratorClient
										}
									/>
								),
							}
						],
					},
					{
						path: "create",
						element: (
							<StrategyDetail
								blackdogConfiguratorClient={
									blackdogConfiguratorClient
								}
								viewState={ViewState.create}
							/>
						),
						action: strategyDetailCreate,
						errorElement: <ErrorPage />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
