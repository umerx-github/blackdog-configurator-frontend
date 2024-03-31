import React, { useEffect, useContext, useState } from "react";
// import { ToggleState } from "../interfaces/settings";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
// import Toggle from "../components/Toggle";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import {
	// Link,
	// useLoaderData,
	// LoaderFunction,
	useParams,
} from "react-router-dom";
// import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
// import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { StrategyGetSingleResponseBodyData } from "@umerx/umerx-blackdog-configurator-types-typescript/build/src/strategy";
import z from "zod";
import StrategyTemplateSeaDogDiscountSchemeList from "./StrategyTemplateSeaDogDiscountSchemeList";
interface StrategyTemplateListProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
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

interface StrategyTemplateListParams {
	strategyId: number;
}

const StrategyTemplateListParamsExpected = z.object({
	strategyId: z.string().regex(/^\d+$/),
});

function StrategyTemplateListParamsFromRaw(
	raw: any
): StrategyTemplateListParams {
	const parsed = StrategyTemplateListParamsExpected.parse(raw);
	return {
		strategyId: parseInt(parsed.strategyId, 10),
	};
}

const StrategyTemplateList: React.FC<StrategyTemplateListProps> = ({
	blackdogConfiguratorClient,
}) => {
	const params = useParams();
	const { strategyId } = StrategyTemplateListParamsFromRaw(params);
	const [strategy, setStrategy] =
		useState<StrategyGetSingleResponseBodyData | null>(null);
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	useEffect(() => {
		if (!strategy) {
			return;
		}
		setBreadcrumbs([
			{
				label: "Home",
				path: "",
			},
			{
				label: "Strategies",
				path: "strategy",
			},
			{
				label: `${strategy.title}`,
				path: `strategy/${strategy.id}`,
			},
			{
				label: "Templates",
				path: `strategy/${strategy.id}/strategyTemplate`,
			},
		]);
	}, [strategy]);
	useEffect(() => {
		(async () => {
			const { data: strategy } = await blackdogConfiguratorClient
				.strategy()
				.getSingle({ id: strategyId });
			setStrategy(strategy);
		})();
	}, [strategyId]);

	if (!strategy) {
		return <></>;
	}
	switch (strategy.strategyTemplateName) {
		case "SeaDogDiscountScheme":
			return (
				<StrategyTemplateSeaDogDiscountSchemeList
					blackdogConfiguratorClient={blackdogConfiguratorClient}
					strategy={strategy}
				></StrategyTemplateSeaDogDiscountSchemeList>
			);
		default:
			return (
				<>
					<p>Unknown strategy template</p>
				</>
			);
	}
};

export default StrategyTemplateList;
