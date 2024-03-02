import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import "./index.css";
import { ToggleState } from "./Interfaces/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import BlackDogHeader from "./components/BlackdogHeader";
import Toggle from "./components/Toggle";
import Breadcrumbs from "./components/Breadcrumbs";
import BreadcrumbsProvider from "./components/BreadcrumbsProvider";
import Home from "./pages/Home";
import StrategiesList from "./pages/StrategiesList";
import StrategyDetail from "./pages/StrategyDetail";
import { ViewState } from "./Interfaces/viewState";
import PageNotFound from "./pages/PageNotFound";

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

const darkModeStateDisplays = {
	[ToggleState.on]: (
		<FontAwesomeIcon
			icon={faMoon}
			className="dark:text-zinc-200 transition-bg duration-1000"
		/>
	),
	[ToggleState.off]: (
		<FontAwesomeIcon
			icon={faSun}
			className="text-zinc-700 transition-bg duration-1000"
		/>
	),
};

function App() {
	// TODO: Move darkMode toggle to new "settings" page
	const [darkModeState, setDarkModeState] = useState<ToggleState>(
		ToggleState.off
	);
	const toggleDarkMode = (newState: ToggleState) => {
		setDarkModeState(newState);
	};
	const strategyDetailRoutes = {
		"/strategy/read/:strategyId": ViewState.read,
		"/strategy/edit/:strategyId": ViewState.edit,
		"/strategy/add": ViewState.add,
	};

	return (
		<div
			className={`configurator-app ${
				darkModeState === ToggleState.on ? "dark" : ""
			}`}
		>
			<div className="min-h-screen dark:bg-zinc-900 dark:text-white transition-bg duration-1000">
				<div className="blackdog-navbar bg-zinc-300 dark:bg-zinc-700 transition-bg duration-1000">
					<div className="flex justify-between p-4">
						<BlackDogHeader />
						<Toggle
							toggleState={darkModeState}
							display={darkModeStateDisplays[darkModeState]}
							onToggle={toggleDarkMode}
						/>
					</div>
				</div>
				<BreadcrumbsProvider>
					<div className="blackdog-breadcrumbs text-zinc-500 dark:text-zinc-400 text-sm px-4 py-2 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
						<Breadcrumbs />
					</div>
					<div className="blackdog-main-content">
						<div className="p-4">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route
									path="/strategy"
									element={
										<StrategiesList
											blackdogConfiguratorClient={
												blackdogConfiguratorClient
											}
										/>
									}
								/>
								{Object.entries(strategyDetailRoutes).map(
									([path, viewState]) => (
										<Route
											key={path}
											path={path}
											element={
												<StrategyDetail
													blackdogConfiguratorClient={
														blackdogConfiguratorClient
													}
													viewState={viewState}
												/>
											}
										/>
									)
								)}
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</div>
					</div>
				</BreadcrumbsProvider>
			</div>
		</div>
	);
}

export default App;
