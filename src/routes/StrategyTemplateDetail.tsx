import React, { useEffect, useContext, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";

import {
	useParams,
} from "react-router-dom";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { Strategy as StrategyTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import z from "zod";
import StrategyTemplateSeaDogDiscountSchemeDetail from "./StrategyTemplateSeaDogDiscountSchemeDetail";
import { ViewState } from "../interfaces/viewState";
interface StrategyTemplateDetailProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState: ViewState;
}

interface StrategyTemplateDetailParams {
	strategyId: number;
	strategyTemplateId: number | null;
}

const StrategyTemplateDetailParamsExpected = z.object({
	strategyId: z.string().regex(/^\d+$/),
	strategyTemplateId: z.string().regex(/^\d+$/).optional(),
});

function StrategyTemplateDetailParamsFromRaw(
	raw: any
): StrategyTemplateDetailParams {
	const parsed = StrategyTemplateDetailParamsExpected.parse(raw);
	return {
		strategyId: parseInt(parsed.strategyId, 10),
		strategyTemplateId: parsed.strategyTemplateId
			? parseInt(parsed.strategyTemplateId, 10)
			: null,
	};
}

const StrategyTemplateDetail: React.FC<StrategyTemplateDetailProps> = ({
	blackdogConfiguratorClient,
	viewState,
}) => {
	const params = useParams();
	const { strategyId, strategyTemplateId } =
		StrategyTemplateDetailParamsFromRaw(params);
	const [strategy, setStrategy] =
		useState<StrategyTypes.StrategyGetSingleResponseBodyData | null>(null);
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	useEffect(() => {
		if (!strategy) {
			return;
		}
		const breadcrumbs = [
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
		];
		if (null !== strategyTemplateId) {
			breadcrumbs.push({
				label: `${strategyTemplateId}`,
				path: `strategy/${strategy.id}/strategyTemplate/${strategyTemplateId}`,
			});
		}
		setBreadcrumbs(breadcrumbs);
	}, [strategy, strategyTemplateId]);
	useEffect(() => {
		(async () => {
			const strategy = await blackdogConfiguratorClient
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
				<StrategyTemplateSeaDogDiscountSchemeDetail
					blackdogConfiguratorClient={blackdogConfiguratorClient}
					strategy={strategy}
					strategyTemplateId={strategyTemplateId}
					viewState={viewState}
				></StrategyTemplateSeaDogDiscountSchemeDetail>
			);
		default:
			return (
				<>
					<p>Unknown strategy template</p>
				</>
			);
	}
};

export default StrategyTemplateDetail;
