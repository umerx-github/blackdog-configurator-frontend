import React, { useEffect, useState, useContext } from "react";
import { ToggleState } from "../Interfaces/settings";
import { Strategy as StrategyTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import Toggle from "../components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { Link } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import BreadcrumbsContext from "../components/BreadcrumbsContext";

interface StrategiesListProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
}

const toggleStateDisplays = {
	[ToggleState.on]: (
		<FontAwesomeIcon
			icon={faCheck}
			className="text-sm transition-bg duration-1000"
		/>
	),
	[ToggleState.off]: (
		<FontAwesomeIcon
			icon={faTimes}
			className="text-sm transition-bg duration-1000"
		/>
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
		updateStrategy(id, newState);
	};

	const updateStrategy = async (id: number, newState: ToggleState) => {
		try {
			await blackdogConfiguratorClient.strategy().patchSingle(
				{ id },
				{
					status: newState === ToggleState.on ? "active" : "inactive",
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		blackdogConfiguratorClient
			.strategy()
			.getMany({})
			.then((response) => {
				setStrategies(response);
				const initialToggleStates: Record<string, ToggleState> = {};
				response.forEach((strategy) => {
					strategy.status === "active"
						? (initialToggleStates[strategy.id] = ToggleState.on)
						: (initialToggleStates[strategy.id] = ToggleState.off);
				});
				setToggleStates(initialToggleStates);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [blackdogConfiguratorClient]);

	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	useEffect(() => {
		setBreadcrumbs([
			{
				label: "Home",
				path: "/",
			},
			{
				label: "Strategies",
				path: "/Strategy",
			},
		]);
	}, [setBreadcrumbs]);

	return (
		<div>
			<div className="relative cursor-pointer flex justify-between flex-wrap">
				{strategies.map((strategy) => (
					<div className="mb-4 w-full" key={strategy.id}>
						<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
							<Toggle
								key={strategy.id}
								toggleState={toggleStates[strategy.id]}
								display={
									toggleStateDisplays[
										toggleStates[strategy.id]
									]
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
			<div className="absolute bottom-4 right-4">
				<Link to="0">
					<FontAwesomeIcon
						icon={faPlus}
						className="text-4xl text-zinc-600 dark:text-zinc-400 transition-bg duration-1000"
					/>
				</Link>
			</div>
		</div>
	);
};

export default StrategiesList;
