import React, { useEffect, useContext, useState } from "react";
import { ToggleState } from "../interfaces/settings";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import Toggle from "../components/toggle/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { Link, useLoaderData } from "react-router-dom";
import BreadcrumbsContext from "../components/breadcrumbs/BreadcrumbsContext";
import { blackdogConfiguratorClient } from "../main";
import {
	StrategyGetManyResponseBodyData,
	StrategyPatchSingleRequestBody,
} from "@umerx/umerx-blackdog-configurator-types-typescript/build/src/strategy";
import {
	translateStrategyStatusToToggleState,
	translateToggleStateToStrategyStatus,
} from "../utils";
import ToggleInnerCheckAndX from "../components/toggle/ToggleInnerCheckAndX";
import FixedButtonLink from "../components/buttons/FixedButtonLink";

interface StrategiesListProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
}

export async function loader() {
	const { data: strategiesLoaded } = await blackdogConfiguratorClient
		.strategy()
		.getMany({});
	return strategiesLoaded;
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
			const { data: newStrategy } = await blackdogConfiguratorClient
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
	}, []);

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
									toggleState={translateStrategyStatusToToggleState(
										strategy.status
									)}
									labelText={strategy.title}
									onChange={(newState) => {
										patchStrategy(strategy.id, {
											status: translateToggleStateToStrategyStatus(
												newState
											),
										});
									}}
								>
									<ToggleInnerCheckAndX
										toggleState={translateStrategyStatusToToggleState(
											strategy.status
										)}
									/>
								</Toggle>
							</div>
						</div>
					</Link>
				))}
			</div>
			<FixedButtonLink icon={faPlus} to="create" />
		</div>
	);
};

export default StrategiesList;
