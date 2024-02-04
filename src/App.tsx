import { useEffect, useState } from "react";
import "./index.css";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { Symbol as SymbolTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";

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
	return (
		<div className="border-black border-4 p-8">
			<h1 className="text-4xl">Blackdog Configurator</h1>
			<div>
				{symbols.map((symbol) => (
					<div key={symbol.id}>
						<h2>{symbol.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
