import React /*,{ useEffect, useState }*/ from "react";
// import { ToggleState } from "../Interfaces/settings";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
// import Toggle from "../components/Toggle";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
// import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import {
	Strategy as StrategyTypes,
	// StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { ViewState } from "../Interfaces/viewState";
// import { Form } from "react-router-dom";

interface StrategyTemplateSeaDogDiscountSchemeListProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	strategy: StrategyTypes.StrategyGetResponseBodyDataInstance;
	strategyTemplateId: number | null;
	viewState: ViewState;
}

// const toggleStateDisplays = {
// 	[ToggleState.on]: (
// 		<FontAwesomeIcon
// 			icon={faCheck}
// 			className="text-sm transition-bg duration-1000"
// 		/>
// 	),
// 	[ToggleState.off]: (
// 		<FontAwesomeIcon
// 			icon={faTimes}
// 			className="text-sm transition-bg duration-1000"
// 		/>
// 	),
// };

const StrategyTemplateSeaDogDiscountSchemeList: React.FC<
	StrategyTemplateSeaDogDiscountSchemeListProps
> = ({
	blackdogConfiguratorClient,
	strategy,
	viewState,
	strategyTemplateId = null,
}) => {
	console.log({
		blackdogConfiguratorClient,
		strategy,
		strategyTemplateId,
		viewState,
	});
	return <>StrategyTemplateSeaDogDiscountSchemeDetail</>;
	// const [statusState, setStatusState] = useState<ToggleState>(
	// 	ToggleState.off
	// );
	// const toggleStatusState = (newState: ToggleState) => {
	// 	setStatusState(newState);
	// };

	// const [strategyTemplate, setStrategyTemplate] =
	// 	useState<StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemeResponseBodyDataInstance | null>(
	// 		null
	// 	);

	// useEffect(() => {
	// 	(async () => {
	// 		if (viewState !== ViewState.create) {
	// 			const strategyTemplate = await blackdogConfiguratorClient
	// 				.strategyTemplateSeaDogDiscountScheme()
	// 				.getSingle({ id: strategyTemplateId });
	// 			setStrategyTemplate(strategyTemplate);
	// 		}
	// 	})();
	// }, [strategyTemplateId, viewState]);

	// const patchStrategyTemplate = async (
	// 	id: number,
	// 	strategyTemplate: StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemePatchRequestBodyDataInstance
	// ) => {
	// 	try {
	// 		const updatedStrategyTemplate = await blackdogConfiguratorClient
	// 			.strategyTemplateSeaDogDiscountScheme()
	// 			.patchSingle({ id }, strategyTemplate);
	// 		setStrategyTemplate(updatedStrategyTemplate);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// if (!strategyTemplate) {
	// 	return <></>;
	// }
	// return (
	// 	<>
	// 		<Form method="post">
	// 			<p>{viewState}</p>
	// 			<dl>
	// 				<dt>Alpaca API Key</dt>
	// 				<dd>
	// 					<input
	// 						type="text"
	// 						defaultValue={""}
	// 						className="w-full"
	// 					/>
	// 				</dd>
	// 				<dt>Alpaca Secret Key</dt>
	// 				<dd>
	// 					<input
	// 						type="text"
	// 						defaultValue={""}
	// 						className="w-full"
	// 					/>
	// 				</dd>
	// 				<dt>Timeframe in Days</dt>
	// 				<dd>
	// 					<input
	// 						type="number"
	// 						defaultValue={""}
	// 						className="w-full"
	// 					/>
	// 				</dd>
	// 				<div className="mb-4 w-full">
	// 					<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
	// 						{viewState === ViewState.create ? (
	// 							<Toggle
	// 								toggleState={statusState}
	// 								display={
	// 									strategy.status === "active"
	// 										? toggleStateDisplays[
	// 												ToggleState.on
	// 										  ]
	// 										: toggleStateDisplays[
	// 												ToggleState.off
	// 										  ]
	// 								}
	// 								labelText="Active?"
	// 								onToggle={toggleStatusState}
	// 							/>
	// 						) : (
	// 							<Toggle
	// 								toggleState={
	// 									strategy.status === "active"
	// 										? ToggleState.on
	// 										: ToggleState.off
	// 								}
	// 								display={
	// 									strategy.status === "active"
	// 										? toggleStateDisplays[
	// 												ToggleState.on
	// 										  ]
	// 										: toggleStateDisplays[
	// 												ToggleState.off
	// 										  ]
	// 								}
	// 								labelText="Active?"
	// 								onToggle={(newState) =>
	// 									patchStrategyTemplate(
	// 										strategyTemplate.id,
	// 										{
	// 											status:
	// 												newState === ToggleState.on
	// 													? "active"
	// 													: "inactive",
	// 										}
	// 									)
	// 								}
	// 							/>
	// 						)}
	// 					</div>
	// 				</div>
	// 			</dl>
	// 		</Form>
	// 	</>
	// );
};

export default StrategyTemplateSeaDogDiscountSchemeList;
