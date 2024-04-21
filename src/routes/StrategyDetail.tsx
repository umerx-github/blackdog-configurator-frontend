import React, { useContext, useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import {
	Strategy as StrategyTypes,
	StrategyTemplate as StrategyTemplateTypes,
	Timeframe as TimeframeTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { ViewState } from "../interfaces/viewState";
import { useNavigate, useParams } from "react-router-dom";
import StrategyDetailView from "../components/StrategyDetailView";
import z, { ZodError } from "zod";
import { AxiosError } from "axios";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { bankersRounding } from "../utils";
import { StrategyDetailFormModel } from "../interfaces/strategyDetail";

interface StrategyDetailProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState: ViewState;
}

const StrategyDetail: React.FC<StrategyDetailProps> = ({
	blackdogConfiguratorClient,
	viewState,
}) => {
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	const [error, setError] = useState<string | null>(null);
	const params = useParams();
	const strategyId = params.strategyId ? parseInt(params.strategyId) : null;
	const navigate = useNavigate();
	const [strategy, setStrategy] =
		useState<StrategyTypes.StrategyResponseBodyDataInstance | null>(null);
	const [model, setModel] = useState<StrategyDetailFormModel>({
		status: StrategyTypes.StatusSchema.Enum.active,
		strategyTemplateName:
			StrategyTemplateTypes.StrategyTemplateNameSchema.Enum.NoOp,
	});
	const [timeframeUnit, setTimeframeUnit] =
		useState<TimeframeTypes.TimeframeUnit>("days");
	// 30 days: new Date(endTimestamp - 1000 * 60 * 60 * 24 * 30).getTime()
	const [startTimestamp, setStartTimestamp] = useState<number | undefined>(
		undefined
	);
	const [aggregateValues, setAggregateValues] = useState<
		StrategyTypes.StrategyAggregateValuesGetManyResponseBodyDataInstance[]
	>([]);
	const [series, setSeries] = useState<ApexAxisChartSeries>([]);
	function getValidationWrappedSubmitter(
		submitter: () => Promise<StrategyTypes.StrategyResponseBodyDataInstance>
	) {
		return () => {
			(async () => {
				let newModel: StrategyDetailFormModel = {
					...model,
					generalError: null,
					statusError: null,
					titleError: null,
					strategyTemplateNameError: null,
					cashInCentsError: null,
				};
				try {
					const newStrategy = await submitter();
					newModel = {
						...newModel,
						...newStrategy,
					};
					navigate(`/strategy/${newStrategy.id}`);
				} catch (e) {
					console.error({ e });
					if (e instanceof ZodError) {
						let generalErrors: string[] = [];
						e.issues.forEach((issue) => {
							switch (issue.path[0]) {
								case "status":
									newModel.statusError = issue.message;
									break;
								case "title":
									newModel.titleError = issue.message;
									break;
								case "strategyTemplateName":
									newModel.strategyTemplateNameError =
										issue.message;
									break;
								case "cashInCents":
									newModel.cashInCentsError = issue.message;
									break;
								default:
									generalErrors.push(
										`${issue.path} ${issue.message}`
									);
									break;
							}
						});
						if (generalErrors.length > 0) {
							newModel.generalError = generalErrors.join(" ");
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
		if (!strategy) {
			return;
		}
		setModel({
			...model,
			status: strategy.status,
			title: strategy.title,
			strategyTemplateName: strategy.strategyTemplateName,
			cashInCents: strategy.cashInCents,
		});
	}, [strategy]);
	useEffect(() => {
		switch (viewState) {
			case ViewState.create:
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
						label: "Create",
						path: "strategy/create",
					},
				]);
				break;
			case ViewState.edit:
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
						label: "Edit",
						path: `strategy/${strategy.id}/edit`,
					},
				]);
				break;
			case ViewState.view:
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
				]);
				break;
		}
	}, [viewState, strategy]);
	useEffect(() => {
		(async () => {
			if (!strategy) {
				return;
			}
			if (!(viewState === ViewState.view)) {
				return;
			}
			const query: StrategyTypes.StrategyAggregateValuesGetManyRequestQuery =
				{
					timeframeUnit,
				};
			if (undefined !== startTimestamp) {
				query.startTimestamp = startTimestamp;
			}
			const aggregateValuesFetched = await blackdogConfiguratorClient
				.strategy()
				.getAggregateValues(
					{
						id: strategy.id,
					},
					query
				);
			setAggregateValues(aggregateValuesFetched.data);
		})();
	}, [viewState, strategy, timeframeUnit, startTimestamp]);
	useEffect(() => {
		const data = aggregateValues.map((aggregateValue) => {
			return [
				aggregateValue.timestamp,
				bankersRounding(aggregateValue.averageValueInCents / 100, 2),
			];
		});
		setSeries([{ data }]);
	}, [aggregateValues]);
	useEffect(() => {
		console.log("fetching strategy", strategyId, strategy);
		if (null === strategyId) {
			return;
		}
		(async () => {
			try {
				const { data: strategyFetched } =
					await blackdogConfiguratorClient
						.strategy()
						.getSingle({ id: strategyId });
				setStrategy(strategyFetched);
			} catch (e) {
				if (e instanceof AxiosError && e.response?.status === 404) {
					setError(
						"🐾 Oh no, we've fetched far and wide but couldn't dig up the strategy you're looking for. It seems to have buried itself too well! Please try again later or check if you've got the right strategy ID. 🐾"
					);
				} else {
					setError(
						`🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`
					);
				}
			}
		})();
	}, [strategyId]);
	if (error) {
		return <>{error}</>;
	}
	switch (viewState) {
		case ViewState.create:
			return (
				<>
					<StrategyDetailView
						viewState={ViewState.create}
						model={model}
						actionIcon={faX}
						actionUrl={`/strategy`}
						onChange={(newModel) => {
							setModel({
								...model,
								...newModel,
							});
						}}
						onSubmit={getValidationWrappedSubmitter(async () => {
							const dataParsed =
								StrategyTypes.StrategyPostSingleRequestBodyFromRaw(
									{
										status: model.status,
										title: model.title,
										strategyTemplateName:
											model.strategyTemplateName,
										cashInCents: model.cashInCents,
									}
								);

							const { data: strategiesCreated } =
								await blackdogConfiguratorClient
									.strategy()
									.postMany([
										{
											...dataParsed,
										},
									]);
							if (strategiesCreated.length < 1) {
								throw new Error(
									"Strategy strategyTemplateName not created."
								);
							}
							const newStrategy = strategiesCreated[0];
							return newStrategy;
						})}
					></StrategyDetailView>
				</>
			);
		case ViewState.edit:
			if (!strategy) {
				return <></>;
			}
			return (
				<StrategyDetailView
					viewState={ViewState.edit}
					model={model}
					actionIcon={faX}
					actionUrl={`/strategy/${strategy.id}`}
					onChange={(newModel) => {
						setModel({
							...model,
							...newModel,
						});
					}}
					onSubmit={getValidationWrappedSubmitter(async () => {
						const dataParsed =
							StrategyTypes.StrategyPatchSingleRequestBodyFromRaw(
								{
									status: model.status,
									title: model.title,
									strategyTemplateName:
										model.strategyTemplateName,
									cashInCents: model.cashInCents,
								}
							);
						console.log({ dataParsed });

						const { data: strategyCreated } =
							await blackdogConfiguratorClient
								.strategy()
								.patchSingle(
									{ id: strategy.id },
									{
										...dataParsed,
									}
								);
						const newStrategy = strategyCreated;
						return newStrategy;
					})}
				></StrategyDetailView>
			);
		case ViewState.view:
			if (!strategy) {
				return <></>;
			}
			// Set the brush chart min to 60% of the way between the earliest and latest timestamps
			let brushChartMin: number | undefined = undefined;
			// Assumes timestamps are sorted in ascending order
			const earliestTimestamp =
				aggregateValues.length > 0
					? aggregateValues[0].timestamp
					: undefined;
			const latestTimestamp =
				aggregateValues.length > 0
					? aggregateValues[aggregateValues.length - 1].timestamp
					: undefined;
			if (
				undefined !== earliestTimestamp &&
				undefined !== latestTimestamp
			) {
				brushChartMin = new Date(
					earliestTimestamp +
						(latestTimestamp - earliestTimestamp) * 0.6
				).getTime();
			}
			return (
				<StrategyDetailView
					viewState={ViewState.view}
					model={model}
					actionIcon={faPenToSquare}
					actionUrl={`edit`}
					series={series}
					brushChartMin={brushChartMin}
					brushChartMax={latestTimestamp}
				></StrategyDetailView>
			);
		default:
			return <>Default</>;
	}
};

export default StrategyDetail;
