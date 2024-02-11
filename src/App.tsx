import { useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { Symbol as SymbolTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Strategy as StrategyTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
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

const testToggleStateDisplays = {
	[ToggleState.on]: (
		<span className="text-xs transition-bg duration-1000">ON</span>
	),
	[ToggleState.off]: (
		<span className="text-xs transition-bg duration-1000">OFF</span>
	),
};

function App() {
	const [symbols, setSymbols] = useState<
		SymbolTypes.SymbolResponseBodyDataInstance[]
	>([]);
	const [strategies, setStrategies] = useState<
		StrategyTypes.StrategyGetResponseBodyDataInstance[]
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
	useEffect(() => {
		blackdogConfiguratorClient
			.strategy()
			.getMany({})
			.then((response) => {
				setStrategies(response);
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

	const [testToggleState, setTestToggleState] = useState<ToggleState>(
		ToggleState.on
	);
	const toggleTestState = (newState: ToggleState) => {
		setTestToggleState(newState);
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
						{/* {symbols.map((symbol) => (
						<Toggle
							key={symbol.id}
							toggleState={testToggleState}
							display={testToggleStateDisplays[testToggleState]}
							labelText={symbol.name}
							onToggle={toggleTestState}
						/>
					))} */}

						{strategies.map((strategy) => (
							<div className="my-4">
								<div className="p-2 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
									<Toggle
										key={strategy.id}
										toggleState={testToggleState}
										display={
											testToggleStateDisplays[
												testToggleState
											]
										}
										labelText={strategy.title}
										onToggle={toggleTestState}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
