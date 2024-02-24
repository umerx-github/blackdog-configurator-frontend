import React, { useEffect, useState } from "react";
import { ToggleState } from "../Interfaces/settings";
import { Strategy as StrategyTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import Toggle from "./Toggle";

interface StrategiesListProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
}

const toggleStateDisplays = {
	[ToggleState.on]: (
		<span className="text-xs transition-bg duration-1000">ON</span>
	),
	[ToggleState.off]: (
		<span className="text-xs transition-bg duration-1000">OFF</span>
	),
};

const StrategiesList: React.FC<StrategiesListProps> = ({
	blackdogConfiguratorClient,
}) => {
	const [strategies, setStrategies] = useState<
		StrategyTypes.StrategyGetResponseBodyDataInstance[]
	>([]);
	const [toggleStates, setToggleStates] = useState<
		Record<string, ToggleState>
	>({});
	const toggleState = (id: number, newState: ToggleState) => {
		setToggleStates((prevStates) => ({
			...prevStates,
			[id]: newState,
		}));
	};

	useEffect(() => {
		blackdogConfiguratorClient
			.strategy()
			.getMany({})
			.then((response) => {
				setStrategies(response);
				const initialToggleStates: Record<string, ToggleState> = {};
				response.forEach((strategy) => {
					initialToggleStates[strategy.id] = ToggleState.off;
				});
				setToggleStates(initialToggleStates);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [blackdogConfiguratorClient]);

	return (
		<div className="relative cursor-pointer flex justify-between flex-wrap">
			{strategies.map((strategy) => (
				<div className="my-4 w-full" key={strategy.id}>
					<div className="p-2 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
						<Toggle
							key={strategy.id}
							toggleState={toggleStates[strategy.id]}
							display={
								toggleStateDisplays[toggleStates[strategy.id]]
							}
							labelText={strategy.title}
							onToggle={(newState) =>
								toggleState(strategy.id, newState)
							}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default StrategiesList;
