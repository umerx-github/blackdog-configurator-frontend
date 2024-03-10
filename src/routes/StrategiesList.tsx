import React, { useEffect, useContext, useState } from "react";
import { ToggleState } from "../interfaces/settings";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import Toggle from "../components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { Link, useLoaderData } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { blackdogConfiguratorClient } from "../main";
import {
	StrategyGetManyResponseBodyData,
	StrategyPatchSingleRequestBody,
} from "@umerx/umerx-blackdog-configurator-types-typescript/build/src/strategy";

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

export async function loader() {
	return await blackdogConfiguratorClient.strategy().getMany({});
}

const StrategiesList: React.FC<StrategiesListProps> = ({
	blackdogConfiguratorClient,
}) => {
	const strategiesLoaded = useLoaderData() as StrategyGetManyResponseBodyData;
	const [strategies, setStrategies] =
		useState<StrategyGetManyResponseBodyData>(strategiesLoaded);

	const patchStrategy = async (
		id: number,
		strategy: StrategyPatchSingleRequestBody
	) => {
		try {
			const newStrategy = await blackdogConfiguratorClient
				.strategy()
				.patchSingle({ id }, strategy);
			// Create a new array of strategies with the updated strategy
			const updatedStrategies = strategies.map((s) => {
				if (s.id === id) {
					return { ...s, ...newStrategy };
				}
				return s;
			});
			setStrategies(updatedStrategies);
		} catch (error) {
			console.error(error);
		}
	};

	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	useEffect(() => {
		setBreadcrumbs([
			{
				label: "Home",
				path: "",
			},
			{
				label: "Strategies",
				path: "strategy",
			},
		]);
	}, [setBreadcrumbs]);

	return (
		<div>
			<div className="relative cursor-pointer flex justify-between flex-wrap">
				{strategies.map((strategy) => (
					<Link
						to={`${strategy.id}`}
						key={strategy.id}
						className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 transition-bg duration-1000"
					>
						<div className="mb-4 w-full" key={strategy.id}>
							<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
								<Toggle
									key={strategy.id}
									toggleState={
										strategy.status === "active"
											? ToggleState.on
											: ToggleState.off
									}
									display={
										toggleStateDisplays[
											strategy.status === "active"
												? ToggleState.on
												: ToggleState.off
										]
									}
									labelText={strategy.title}
									onToggle={(newState) =>
										patchStrategy(strategy.id, {
											status:
												newState === ToggleState.on
													? "active"
													: "inactive",
										})
									}
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
			<div className="absolute bottom-4 right-4">
				<Link to="create">
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
