import React, { useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import {
	Strategy as StrategyTypes,
	StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { ViewState } from "../Interfaces/viewState";
import { useNavigate } from "react-router-dom";
import StrategyTemplateSeaDogDiscountSchemeDetailForm from "../components/StrategyTemplateSeaDogDiscountSchemeDetailForm";
import z, { ZodError } from "zod";

interface StrategyTemplateSeaDogDiscountSchemeDetailProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	strategy: StrategyTypes.StrategyGetResponseBodyDataInstance;
	strategyTemplateId: number | null;
	viewState: ViewState;
}

const StrategyTemplateSeaDogDiscountSchemeDetail: React.FC<
	StrategyTemplateSeaDogDiscountSchemeDetailProps
> = ({
	blackdogConfiguratorClient,
	strategy,
	viewState,
	strategyTemplateId = null,
}) => {
	const navigate = useNavigate();
	const [strategyTemplate, setStrategyTemplate] =
		useState<StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemeResponseBodyDataInstance | null>(
			null
		);
	const [generalError, setGeneralError] = useState<string | null>(null);
	const [statusError, setStatusError] = useState<string | null>(null);
	const [alpacaAPIKeyError, setAlpacaAPIKeyError] = useState<string | null>(
		null
	);
	const [alpacaAPISecretError, setAlpacaAPISecretError] = useState<
		string | null
	>(null);
	const [alpacaAPIPaperError, setAlpacaAPIPaperError] = useState<
		string | null
	>(null);
	const [buyAtPercentileError, setBuyAtPercentileError] = useState<
		string | null
	>(null);
	const [sellAtPercentileError, setSellAtPercentileError] = useState<
		string | null
	>(null);
	const [minimumGainPercentError, setMinimumGainPercentError] = useState<
		string | null
	>(null);
	const [timeframeInDaysError, setTimeframeInDaysError] = useState<
		string | null
	>(null);
	const [symbolIdsError, setSymbolIdsError] = useState<string | null>(null);
	useEffect(() => {
		(async () => {
			if (null !== strategyTemplateId) {
				const strategyTemplateFetched = await blackdogConfiguratorClient
					.strategyTemplateSeaDogDiscountScheme()
					.getSingle({ id: strategyTemplateId });
				setStrategyTemplate(strategyTemplateFetched);
			}
		})();
	}, [strategyTemplateId]);
	switch (viewState) {
		case ViewState.create:
			return (
				<>
					<StrategyTemplateSeaDogDiscountSchemeDetailForm
						viewState={ViewState.create}
						actionIcon={faX}
						actionUrl={`/strategy/${strategy.id}/strategyTemplate`}
						onSubmit={(data) => {
							(async () => {
								console.log("handling on submit");
								try {
									setStatusError(null);
									setAlpacaAPIKeyError(null);
									setAlpacaAPISecretError(null);
									setAlpacaAPIPaperError(null);
									setBuyAtPercentileError(null);
									setSellAtPercentileError(null);
									setMinimumGainPercentError(null);
									setTimeframeInDaysError(null);
									setSymbolIdsError(null);
									setGeneralError(null);
									const dataParsed =
										StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemePostSingleRequestBodyFromRaw(
											{
												...data,
												strategyId: strategy.id,
											}
										);
									(async () => {
										try {
											const strategyTemplatesCreated =
												await blackdogConfiguratorClient
													.strategyTemplateSeaDogDiscountScheme()
													.postMany([
														{
															...dataParsed,
															strategyId:
																strategy.id,
														},
													]);
											if (
												strategyTemplatesCreated.length <
												1
											) {
												throw new Error(
													"Strategy template not created."
												);
											}
											console.log("redirecting");
											navigate(
												`/strategy/${strategy.id}/strategyTemplate/${strategyTemplatesCreated[0].id}`
											);
										} catch (e) {
											console.error({ e });
											// If e has a message and it is a string, set general error to e.message
											if (
												typeof e === "string" ||
												e instanceof String
											) {
												console.error({ e });
												setGeneralError(e.toString());
												return;
											}
										}
									})();
								} catch (e) {
									console.error({ e });
									if (e instanceof ZodError) {
										let generalErrors: string[] = [];
										e.issues.forEach((issue) => {
											switch (issue.path[0]) {
												case "status":
													setStatusError(
														issue.message
													);
													break;
												case "alpacaAPIKey":
													setAlpacaAPIKeyError(
														issue.message
													);
													break;
												case "alpacaAPISecret":
													setAlpacaAPISecretError(
														issue.message
													);
													break;
												case "alpacaAPIPaper":
													setAlpacaAPIPaperError(
														issue.message
													);
													break;
												case "buyAtPercentile":
													setBuyAtPercentileError(
														issue.message
													);
													break;
												case "sellAtPercentile":
													setSellAtPercentileError(
														issue.message
													);
													break;
												case "minimumGainPercent":
													setMinimumGainPercentError(
														issue.message
													);
													break;
												case "timeframeInDays":
													setTimeframeInDaysError(
														issue.message
													);
													break;
												case "symbolIds":
													setSymbolIdsError(
														issue.message
													);
													break;
												default:
													generalErrors.push(
														`${issue.path}: ${issue.message}`
													);
													break;
											}
										});
										console.error({ generalErrors });
										if (generalErrors.length > 0) {
											setGeneralError(
												generalErrors.join(" ")
											);
										}
										return;
									}
									setGeneralError(`Error found. ${e}`);
								}
							})();
						}}
						generalError={generalError}
						statusError={statusError}
						alpacaAPIKeyError={alpacaAPIKeyError}
						alpacaAPISecretError={alpacaAPISecretError}
						alpacaAPIPaperError={alpacaAPIPaperError}
						buyAtPercentileError={buyAtPercentileError}
						sellAtPercentileError={sellAtPercentileError}
						minimumGainPercentError={minimumGainPercentError}
						timeframeInDaysError={timeframeInDaysError}
						symbolIdsError={symbolIdsError}
					></StrategyTemplateSeaDogDiscountSchemeDetailForm>
				</>
			);
		case ViewState.edit:
			if (!strategyTemplate) {
				return <></>;
			}
			return (
				<StrategyTemplateSeaDogDiscountSchemeDetailForm
					viewState={ViewState.edit}
					actionIcon={faX}
					actionUrl={`/strategy/${strategy.id}/strategyTemplate/${strategyTemplate.id}`}
					onSubmit={(data) => {
						console.log("handling on submit");
						(async () => {
							try {
								console.log("handing on submit");
								console.log({ data });
								setStatusError(null);
								setAlpacaAPIKeyError(null);
								setAlpacaAPISecretError(null);
								setAlpacaAPIPaperError(null);
								setBuyAtPercentileError(null);
								setSellAtPercentileError(null);
								setMinimumGainPercentError(null);
								setTimeframeInDaysError(null);
								setSymbolIdsError(null);
								setGeneralError(null);
								const dataParsed =
									StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemePutSingleRequestBodyFromRaw(
										{
											...data,
											strategyId: strategy.id,
										}
									);
								(async () => {
									try {
										const strategyTemplateCreated =
											await blackdogConfiguratorClient
												.strategyTemplateSeaDogDiscountScheme()
												.patchSingle(
													{ id: strategyTemplate.id },
													{
														...dataParsed,
														strategyId: strategy.id,
													}
												);
										console.log("redirecting");
										navigate(
											`/strategy/${strategy.id}/strategyTemplate/${strategyTemplateCreated.id}`
										);
									} catch (e) {
										console.error({ e });
										// If e has a message and it is a string, set general error to e.message
										if (
											typeof e === "string" ||
											e instanceof String
										) {
											console.error({ e });
											setGeneralError(e.toString());
											return;
										}
									}
								})();
							} catch (e) {
								console.error({ e });
								if (e instanceof ZodError) {
									e.issues.forEach((issue) => {
										switch (issue.path[0]) {
											case "status":
												setStatusError(issue.message);
												break;
											case "alpacaAPIKey":
												setAlpacaAPIKeyError(
													issue.message
												);
												break;
											case "alpacaAPISecret":
												setAlpacaAPISecretError(
													issue.message
												);
												break;
											case "alpacaAPIPaper":
												setAlpacaAPIPaperError(
													issue.message
												);
												break;
											case "buyAtPercentile":
												setBuyAtPercentileError(
													issue.message
												);
												break;
											case "sellAtPercentile":
												setSellAtPercentileError(
													issue.message
												);
												break;
											case "minimumGainPercent":
												setMinimumGainPercentError(
													issue.message
												);
												break;
											case "timeframeInDays":
												setTimeframeInDaysError(
													issue.message
												);
												break;
											case "symbolIds":
												setSymbolIdsError(
													issue.message
												);
												break;
										}
									});
									return;
								}
								setGeneralError(`Error found. ${e}`);
							}
						})();
					}}
					status={strategyTemplate.status}
					alpacaAPIKey={strategyTemplate.alpacaAPIKey}
					alpacaAPISecret={strategyTemplate.alpacaAPISecret}
					alpacaAPIPaper={strategyTemplate.alpacaAPIPaper}
					buyAtPercentile={strategyTemplate.buyAtPercentile}
					sellAtPercentile={strategyTemplate.sellAtPercentile}
					minimumGainPercent={strategyTemplate.minimumGainPercent}
					timeframeInDays={strategyTemplate.timeframeInDays}
					symbolIds={strategyTemplate.symbolIds}
					generalError={generalError}
					statusError={statusError}
					alpacaAPIKeyError={alpacaAPIKeyError}
					alpacaAPISecretError={alpacaAPISecretError}
					alpacaAPIPaperError={alpacaAPIPaperError}
					buyAtPercentileError={buyAtPercentileError}
					sellAtPercentileError={sellAtPercentileError}
					minimumGainPercentError={minimumGainPercentError}
					timeframeInDaysError={timeframeInDaysError}
					symbolIdsError={symbolIdsError}
				></StrategyTemplateSeaDogDiscountSchemeDetailForm>
			);
		case ViewState.view:
			if (!strategyTemplate) {
				return <></>;
			}
			return (
				<StrategyTemplateSeaDogDiscountSchemeDetailForm
					viewState={ViewState.view}
					actionIcon={faPenToSquare}
					actionUrl={`/strategy/${strategy.id}/strategyTemplate/${strategyTemplate.id}/edit`}
					status={strategyTemplate.status}
					alpacaAPIKey={strategyTemplate.alpacaAPIKey}
					alpacaAPISecret={strategyTemplate.alpacaAPISecret}
					alpacaAPIPaper={strategyTemplate.alpacaAPIPaper}
					buyAtPercentile={strategyTemplate.buyAtPercentile}
					sellAtPercentile={strategyTemplate.sellAtPercentile}
					minimumGainPercent={strategyTemplate.minimumGainPercent}
					timeframeInDays={strategyTemplate.timeframeInDays}
					symbolIds={strategyTemplate.symbolIds}
				></StrategyTemplateSeaDogDiscountSchemeDetailForm>
			);
		default:
			return <>Default</>;
	}
};

export default StrategyTemplateSeaDogDiscountSchemeDetail;
