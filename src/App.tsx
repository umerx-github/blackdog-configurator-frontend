import { useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import StrategiesList from "./components/StrategiesList";
import { ToggleState } from "./Interfaces/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import BlackDogHeader from "./components/BlackdogHeader";
import Toggle from "./components/Toggle";

const blackdogConfiguratorClientScheme =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_CLIENT_SCHEME ?? "";
const blackdogConfiguratorClientHost =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_CLIENT_HOST ?? "";
const blackdogConfiguratorClientPort =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_CLIENT_PORT ?? "";
const blackdogConfiguratorClientPath =
	import.meta.env.VITE_BLACKDOG_CONFIGURATOR_CLIENT_PATH ?? "";

const blackdogConfiguratorClientBaseUrl = `${blackdogConfiguratorClientScheme}://${blackdogConfiguratorClientHost}${
	"" === blackdogConfiguratorClientPort
		? ""
		: `:${blackdogConfiguratorClientPort}`
}${blackdogConfiguratorClientPath}`;

const blackdogConfiguratorClient = new BlackdogConfiguratorClient.ClientImpl(
	blackdogConfiguratorClientBaseUrl
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
	const [darkModeState, setDarkModeState] = useState<ToggleState>(
		ToggleState.off
	);
	const toggleDarkMode = (newState: ToggleState) => {
		setDarkModeState(newState);
	};

	return (
		<div
			className={`configurator-app ${
				darkModeState === ToggleState.on ? "dark" : ""
			}`}
		>
			<div className="min-h-screen dark:bg-zinc-900 dark:text-white transition-bg duration-1000">
				<div className="blackdog-navbar bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
					<div className="flex justify-between p-4">
						<BlackDogHeader />
						<Toggle
							toggleState={darkModeState}
							display={darkModeStateDisplays[darkModeState]}
							onToggle={toggleDarkMode}
						/>
					</div>
				</div>
				<div className="blackdog-main-content">
					<div className="p-4">
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route
								path="/strategies"
								element={
									<StrategiesList
										blackdogConfiguratorClient={
											blackdogConfiguratorClient
										}
									/>
								}
							></Route>
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
