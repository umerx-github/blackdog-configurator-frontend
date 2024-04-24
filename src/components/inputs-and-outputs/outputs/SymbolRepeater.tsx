import React, { useEffect, useState } from "react";
import { Symbol as SymbolTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";

interface SymbolRepeaterProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	symbolIds: number[];
}

export default function SymbolRepeater({
	blackdogConfiguratorClient,
	symbolIds,
}: SymbolRepeaterProps) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [symbols, setSymbols] = useState<
		SymbolTypes.SymbolGetManyResponseBodyDataInstance[]
	>([]);
	useEffect(() => {
		(async () => {
			const query: SymbolTypes.SymbolGetManyRequestQuery = {};
			if (symbolIds.length > 0) {
				query.ids = symbolIds;
			}
			const { data: symbols } = await blackdogConfiguratorClient
				.symbol()
				.getMany(query);
			setSymbols(symbols);
			setIsLoading(false);
		})();
	}, [symbolIds]);
	if (isLoading) {
		return <></>;
	}
	return (
		<ul>
			{symbols.map((symbol) => {
				return <li key={symbol.id}>{symbol.name}</li>;
			})}
		</ul>
	);
}
