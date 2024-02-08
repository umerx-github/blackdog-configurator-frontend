import { useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { Symbol as SymbolTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import "./index.css";
import { ToggleState } from "./Interfaces/settings";
import DetailView from "./components/DetailView";
import BlackDogHeader from "./components/BlackdogHeader";
import Toggle from "./components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

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

// const darkModeStates: DarkModeState[] = [
// 	{
// 		toggleStateStatus: ToggleState.on,
// 		display: <FontAwesomeIcon icon={faSun} />,
// 	},
// 	{
// 		toggleStateStatus: ToggleState.off,
// 		display: <FontAwesomeIcon icon={faMoon} />,
// 	},
// ];

const darkModeStateDisplays = {
	[ToggleState.on]: (
		<FontAwesomeIcon
			icon={faMoon}
			className="dark:text-zinc-900 transition-all duration-1000"
		/>
	),
	[ToggleState.off]: (
		<FontAwesomeIcon
			icon={faSun}
			className="text-white transition-all duration-1000"
		/>
	),
};

function App() {
	const [symbols, setSymbols] = useState<
		SymbolTypes.SymbolResponseBodyDataInstance[]
	>([]);
	useEffect(() => {
		blackdogConfiguratorClient
			.symbol()
			.getMany({})
			.then((response) => {
				setSymbols(response);
			})
			.catch((error) => {
				console.error(error);
			});
	});

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
			<div className="p-4 min-h-screen dark:bg-zinc-900 dark:text-white transition-all duration-1000">
				<div className="flex justify-between">
					<BlackDogHeader />
					<Toggle
						toggleState={darkModeState}
						display={darkModeStateDisplays[darkModeState]}
						labelText="Display Mode"
						onToggle={toggleDarkMode}
					/>
				</div>

				{/* <div>
				{symbols.map((symbol) => (
					<div key={symbol.id}>
						<h2>{symbol.name}</h2>
					</div>
				))}
			</div> */}
				<DetailView />
			</div>
		</div>
	);
}

export default App;
