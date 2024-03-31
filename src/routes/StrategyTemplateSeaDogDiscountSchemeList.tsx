import React, { useEffect, useState } from "react";
import { ToggleState } from "../interfaces/settings";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import Toggle from "../components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { Link } from "react-router-dom";
import {
	Strategy as StrategyTypes,
	StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import ToggleInnerCheckAndX from "../components/ToggleInnerCheckAndX";
import {
	translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState,
	translateToggleStateToStrategyTemplateSeaDogDiscountSchemeStatus,
} from "../utils";

interface StrategyTemplateSeaDogDiscountSchemeListProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	strategy: StrategyTypes.StrategyGetResponseBodyDataInstance;
}
const StrategyTemplateSeaDogDiscountSchemeList: React.FC<
	StrategyTemplateSeaDogDiscountSchemeListProps
> = ({ blackdogConfiguratorClient, strategy }) => {
	const [strategyTemplates, setStrategyTemplates] = useState<
		StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemeGetManyResponseBodyDataInstance[]
	>([]);
	useEffect(() => {
		(async () => {
			const strategyTemplateResponse = await blackdogConfiguratorClient
				.strategyTemplateSeaDogDiscountScheme()
				.getMany({
					strategyId: strategy.id,
				});
			if (strategyTemplateResponse.status === "success") {
				setStrategyTemplates(strategyTemplateResponse.data);
			} else {
				console.error(strategyTemplateResponse);
			}
		})();
	}, [strategy]);

	const patchStrategyTemplate = async (
		strategyTemplateId: number,
		strategyTemplate: StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemePatchSingleRequestBody
	) => {
		try {
			const { data: newStrategyTemplate } =
				await blackdogConfiguratorClient
					.strategyTemplateSeaDogDiscountScheme()
					.patchSingle({ id: strategyTemplateId }, strategyTemplate);
			// Create a new array of strategies with the updated strategy
			const updatedStrategyTemplates = strategyTemplates.map((s) => {
				if (s.id === strategyTemplateId) {
					return { ...s, ...newStrategyTemplate };
				}
				return s;
			});

			setStrategyTemplates(updatedStrategyTemplates);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<div className="relative cursor-pointer flex justify-between flex-wrap">
				{strategyTemplates.map((strategyTemplate) => (
					<Link
						to={`${strategyTemplate.id}`}
						key={strategyTemplate.id}
						className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 transition-bg duration-1000"
					>
						<div className="mb-4 w-full" key={strategyTemplate.id}>
							<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
								<Toggle
									key={strategyTemplate.id}
									toggleState={translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState(
										strategyTemplate.status
									)}
									labelText={strategyTemplate.id.toString()}
									onChange={(newState) => {
										(async () => {
											await patchStrategyTemplate(
												strategyTemplate.id,
												{
													status: translateToggleStateToStrategyTemplateSeaDogDiscountSchemeStatus(
														newState
													),
												}
											);
											const {
												data: strategyTemplateResponse,
											} = await blackdogConfiguratorClient
												.strategyTemplateSeaDogDiscountScheme()
												.getMany({
													strategyId: strategy.id,
												});
											setStrategyTemplates(
												strategyTemplateResponse
											);
										})();
									}}
								>
									<ToggleInnerCheckAndX
										toggleState={translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState(
											strategyTemplate.status
										)}
									/>
								</Toggle>
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

export default StrategyTemplateSeaDogDiscountSchemeList;
