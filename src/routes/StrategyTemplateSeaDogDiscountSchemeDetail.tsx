import React, { useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {
	Response as ResponseTypes,
	Strategy as StrategyTypes,
	StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { AxiosError } from "axios";
import { ViewState } from "../interfaces/viewState";
import { useNavigate } from "react-router-dom";
import StrategyTemplateSeaDogDiscountSchemeDetailForm from "../components/StrategyTemplateSeaDogDiscountSchemeDetailForm";
import z, { ZodError } from "zod";
import { StrategyTemplateSeaDogDiscountSchemeDetailFormModel } from "../interfaces/strategyTemplateSeaDogDiscountSchemeDetail";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

function convertStrategyTemplateSeaDogDiscountSchemeDetailFormModelToRequestBodyDataInstanceProperties(
	model: StrategyTemplateSeaDogDiscountSchemeDetailFormModel
) {
	return {
		status: model.status,
		alpacaAPIKey: model.alpacaAPIKey,
		alpacaAPISecret: model.alpacaAPISecret,
		alpacaAPIPaper: model.alpacaAPIPaper,
		buyAtPercentile: model.buyAtPercentile,
		sellAtPercentile: model.sellAtPercentile,
		minimumGainPercent: model.minimumGainPercent,
		timeframeInDays: model.timeframeInDays,
		symbolIds: model.symbolIds,
	};
}

function appendIssuesToModel(
	issues: ResponseTypes.ResponseIssue[],
	model: StrategyTemplateSeaDogDiscountSchemeDetailFormModel
) {
	let generalErrors: string[] = [];
	issues.forEach((issue) => {
		switch (issue.path[issue.path.length - 1]) {
			case "status":
				model.statusError = issue.message;
				break;
			case "alpacaAPIKey":
				model.alpacaAPIKeyError = issue.message;
				break;
			case "alpacaAPISecret":
				model.alpacaAPISecretError = issue.message;
				break;
			case "alpacaAPIPaper":
				model.alpacaAPIPaperError = issue.message;
				break;
			case "buyAtPercentile":
				model.buyAtPercentileError = issue.message;
				break;
			case "sellAtPercentile":
				model.sellAtPercentileError = issue.message;
				break;
			case "minimumGainPercent":
				model.minimumGainPercentError = issue.message;
				break;
			case "timeframeInDays":
				model.timeframeInDaysError = issue.message;
				break;
			case "symbolIds":
				model.symbolIdsError = issue.message;
				break;
			default:
				generalErrors.push(`${issue.path}: ${issue.message}`);
				break;
		}
	});
	if (generalErrors.length > 0) {
		model.generalError = generalErrors.join(" ");
	}
	return model;
}
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
	const [model, setModel] =
		useState<StrategyTemplateSeaDogDiscountSchemeDetailFormModel>({
			status: StrategyTemplateSeaDogDiscountSchemeTypes.StatusSchema.Enum
				.active,
			alpacaAPIPaper: true,
		});
	const [error, setError] = useState<string | null>(null);
	function getValidationWrappedSubmitter(
		submitter: () => Promise<StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemeResponseBodyDataInstance>
	) {
		return () => {
			(async () => {
				let newModel: StrategyTemplateSeaDogDiscountSchemeDetailFormModel =
					{
						...model,
						statusError: null,
						alpacaAPIKeyError: null,
						alpacaAPISecretError: null,
						alpacaAPIPaperError: null,
						buyAtPercentileError: null,
						sellAtPercentileError: null,
						minimumGainPercentError: null,
						timeframeInDaysError: null,
						symbolIdsError: null,
						generalError: null,
					};
				try {
					const newStrategyTemplate = await submitter();
					newModel = {
						...newModel,
						...newStrategyTemplate,
					};
					navigate(
						`/strategy/${strategy.id}/strategyTemplate/${newStrategyTemplate.id}`
					);
				} catch (e) {
					console.error({ e });
					if (e instanceof ZodError) {
						appendIssuesToModel(e.issues, newModel);
					} else if (e instanceof AxiosError) {
						try {
							const response =
								ResponseTypes.ResponseBaseErrorExpected.parse(
									e?.response?.data
								);
							appendIssuesToModel(response.issues, newModel);
						} catch (e) {
							console.error({ e });
							if (typeof e === "string" || e instanceof String) {
								newModel.generalError = e.toString();
							} else {
								setError(
									`🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`
								);
							}
						}
					} else if (typeof e === "string" || e instanceof String) {
						newModel.generalError = e.toString();
					}
				} finally {
					setModel(newModel);
				}
			})();
		};
	}
	useEffect(() => {
		(async () => {
			if (null !== strategyTemplateId) {
				const { data: strategyTemplateFetched } =
					await blackdogConfiguratorClient
						.strategyTemplateSeaDogDiscountScheme()
						.getSingle({ id: strategyTemplateId });
				setStrategyTemplate(strategyTemplateFetched);
			}
		})();
	}, [strategyTemplateId]);
	useEffect(() => {
		if (!strategyTemplate) {
			return;
		}
		setModel({
			...model,
			status: strategyTemplate.status,
			alpacaAPIKey: strategyTemplate.alpacaAPIKey,
			alpacaAPISecret: strategyTemplate.alpacaAPISecret,
			alpacaAPIPaper: strategyTemplate.alpacaAPIPaper,
			buyAtPercentile: strategyTemplate.buyAtPercentile,
			sellAtPercentile: strategyTemplate.sellAtPercentile,
			minimumGainPercent: strategyTemplate.minimumGainPercent,
			timeframeInDays: strategyTemplate.timeframeInDays,
			symbolIds: strategyTemplate.symbolIds,
		});
	}, [strategyTemplate]);
	switch (viewState) {
		case ViewState.create:
			return (
				<>
					<StrategyTemplateSeaDogDiscountSchemeDetailForm
						model={model}
						blackdogConfiguratorClient={blackdogConfiguratorClient}
						viewState={ViewState.create}
						actionIcon={faXmark}
						actionUrl={`/strategy/${strategy.id}/strategyTemplate`}
						onChange={(newModel) => {
							setModel({
								...model,
								...newModel,
							});
						}}
						onSubmit={getValidationWrappedSubmitter(async () => {
							const dataParsed =
								StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemePostSingleRequestBodyFromRaw(
									{
										strategyId: strategy.id,
										...convertStrategyTemplateSeaDogDiscountSchemeDetailFormModelToRequestBodyDataInstanceProperties(
											model
										),
									}
								);
							const { data: strategyTemplatesCreated } =
								await blackdogConfiguratorClient
									.strategyTemplateSeaDogDiscountScheme()
									.postMany([
										{
											...dataParsed,
											strategyId: strategy.id,
										},
									]);
							if (strategyTemplatesCreated.length < 1) {
								throw new Error(
									"Strategy template not created."
								);
							}
							const newStrategyTemplate =
								strategyTemplatesCreated[0];
							return newStrategyTemplate;
						})}
					></StrategyTemplateSeaDogDiscountSchemeDetailForm>
				</>
			);
		case ViewState.edit:
			if (!strategyTemplate) {
				return <></>;
			}
			return (
				<StrategyTemplateSeaDogDiscountSchemeDetailForm
					model={model}
					blackdogConfiguratorClient={blackdogConfiguratorClient}
					viewState={ViewState.edit}
					actionIcon={faXmark}
					actionUrl={`/strategy/${strategy.id}/strategyTemplate/${strategyTemplate.id}`}
					onChange={(newModel) => {
						setModel({
							...model,
							...newModel,
						});
					}}
					onSubmit={getValidationWrappedSubmitter(async () => {
						const dataParsed =
							StrategyTemplateSeaDogDiscountSchemeTypes.StrategyTemplateSeaDogDiscountSchemePutSingleRequestBodyFromRaw(
								{
									strategyId: strategy.id,
									...convertStrategyTemplateSeaDogDiscountSchemeDetailFormModelToRequestBodyDataInstanceProperties(
										model
									),
								}
							);
						const { data: strategyTemplateCreated } =
							await blackdogConfiguratorClient
								.strategyTemplateSeaDogDiscountScheme()
								.patchSingle(
									{ id: strategyTemplate.id },
									{
										...dataParsed,
										strategyId: strategy.id,
									}
								);
						return strategyTemplateCreated;
					})}
				></StrategyTemplateSeaDogDiscountSchemeDetailForm>
			);
		case ViewState.view:
			if (!strategyTemplate) {
				return <></>;
			}
			return (
				<StrategyTemplateSeaDogDiscountSchemeDetailForm
					model={model}
					blackdogConfiguratorClient={blackdogConfiguratorClient}
					viewState={ViewState.view}
					actionIcon={faPenToSquare}
					actionUrl={`/strategy/${strategy.id}/strategyTemplate/${strategyTemplate.id}/edit`}
				></StrategyTemplateSeaDogDiscountSchemeDetailForm>
			);
		default:
			return <>Default</>;
	}
};

export default StrategyTemplateSeaDogDiscountSchemeDetail;
