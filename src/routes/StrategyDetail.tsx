import { ViewState } from "../Interfaces/viewState";
import React, { useEffect, useContext, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { StrategyTemplate } from "@umerx/umerx-blackdog-configurator-types-typescript";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { Form, LoaderFunction, useLoaderData } from "react-router-dom";
import Toggle from "../components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { ToggleState } from "../Interfaces/settings";
import { blackdogConfiguratorClient } from "../main";
import z from "zod";
import {
	StrategyGetSingleResponseBodyData,
	StrategyPatchSingleRequestBody,
} from "@umerx/umerx-blackdog-configurator-types-typescript/build/src/strategy";

interface StrategyDetailProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState: ViewState;
}

interface StrategyDetailParams {
	strategyId: number;
}

const statusStateDisplays = {
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

const StrategyDetailParamsExpected = z.object({
	strategyId: z.string().regex(/^\d+$/),
});

function StrategyDetailParamsFromRaw(raw: any): StrategyDetailParams {
	const parsed = StrategyDetailParamsExpected.parse(raw);
	return {
		strategyId: parseInt(parsed.strategyId, 10),
	};
}

export const loader: LoaderFunction = async ({ params }) => {
	const strategyDetailParams = StrategyDetailParamsFromRaw(params);
	return await blackdogConfiguratorClient
		.strategy()
		.getSingle({ id: strategyDetailParams.strategyId });
};

export async function action() {
	const strategy = await createStrategy();
	return { strategy };
}

function createStrategy() {
	return {
		title: "New Strategy",
		strategyTemplateName: "SeaDogDiscountScheme",
		cashInCents: 0,
		status: "inactive",
	};
}

const StrategyDetail: React.FC<StrategyDetailProps> = ({
	blackdogConfiguratorClient,
	viewState = ViewState.view,
}) => {
	const [statusState, setStatusState] = useState<ToggleState>(
		ToggleState.off
	);
	const toggleStatusState = (newState: ToggleState) => {
		setStatusState(newState);
	};

	const strategyLoaded = useLoaderData() as StrategyGetSingleResponseBodyData;
	const [strategy, setStrategy] =
		useState<StrategyGetSingleResponseBodyData>(strategyLoaded);

	const patchStrategy = async (
		id: number,
		strategy: StrategyPatchSingleRequestBody
	) => {
		try {
			const updatedStrategy = await blackdogConfiguratorClient
				.strategy()
				.patchSingle({ id }, strategy);
			setStrategy(updatedStrategy);
		} catch (error) {
			console.error(error);
		}
	};

	const templates: StrategyTemplate.StrategyTemplateName[] = [
		"SeaDogDiscountScheme",
	];

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
		<>
			<Form method="post">
				<p>{viewState}</p>
				<dl>
					<dt>Title</dt>
					<dd>
						<input
							type="text"
							defaultValue={strategy?.title}
							className="w-full"
						/>
					</dd>

					<dt>Template</dt>
					<dd>
						<select defaultValue={strategy?.strategyTemplateName}>
							{templates.map((template) => (
								<option key={template} value={template}>
									{template}
								</option>
							))}
						</select>
					</dd>

					<dt>Designated Funds</dt>
					<dd>
						$
						<input
							type="number"
							defaultValue={
								strategy ? strategy.cashInCents / 100 : 0
							}
						/>
					</dd>

					<div className="mb-4 w-full">
						<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
							{viewState === ViewState.create ? (
								<Toggle
									toggleState={statusState}
									display={statusStateDisplays[statusState]}
									labelText="Active?"
									onToggle={toggleStatusState}
								/>
							) : (
								<Toggle
									toggleState={
										strategy.status === "active"
											? ToggleState.on
											: ToggleState.off
									}
									display={
										strategy.status === "active"
											? statusStateDisplays[
													ToggleState.on
											  ]
											: statusStateDisplays[
													ToggleState.off
											  ]
									}
									labelText="Active?"
									onToggle={(newState) =>
										patchStrategy(strategy.id, {
											status:
												newState === ToggleState.on
													? "active"
													: "inactive",
										})
									}
								/>
							)}
						</div>
					</div>
				</dl>
			</Form>
		</>
	);
};

export default StrategyDetail;
