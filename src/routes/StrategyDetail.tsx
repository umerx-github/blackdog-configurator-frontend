import React, { useContext, useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import {
	Strategy as StrategyTypes,
	Timeframe as TimeframeTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { ViewState } from "../interfaces/viewState";
import { useNavigate, useParams } from "react-router-dom";
import StrategyDetailView from "../components/StrategyDetailView";
import z, { ZodError } from "zod";
import { AxiosError } from "axios";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { bankersRounding } from "../utils";

interface StrategyDetailProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState: ViewState;
}

const StrategyDetail: React.FC<StrategyDetailProps> = ({
	blackdogConfiguratorClient,
	viewState,
}) => {
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	const params = useParams();
	const strategyId = params.strategyId ? parseInt(params.strategyId) : null;
	const navigate = useNavigate();
	const [strategy, setStrategy] =
		useState<StrategyTypes.StrategyResponseBodyDataInstance | null>(null);
	const [generalError, setGeneralError] = useState<string | null>(null);
	const [statusError, setStatusError] = useState<string | null>(null);
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [titleError, setTitleError] = useState<string | null>(null);
	const [strategyTemplateNameError, setTemplateError] = useState<
		string | null
	>(null);
	const [cashInCentsError, setCashInCentsError] = useState<string | null>(
		null
	);
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
	useEffect(() => {
		if (null === strategy) {
			setTitle(undefined);
			return;
		}
		setTitle(strategy.title);
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
		(async () => {
			if (null !== strategyId) {
				try {
					const { data: strategyFetched } =
						await blackdogConfiguratorClient
							.strategy()
							.getSingle({ id: strategyId });
					setStrategy(strategyFetched);
				} catch (e) {
					if (e instanceof AxiosError && e.response?.status === 404) {
						setStatusError(
							"🐾 Oh no, we've fetched far and wide but couldn't dig up the strategy you're looking for. It seems to have buried itself too well! Please try again later or check if you've got the right strategy ID. 🐾"
						);
					} else {
						setGeneralError(
							`🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`
						);
					}
				}
			}
		})();
	}, [strategyId]);
	if (statusError) {
		return <>{statusError}</>;
	}
	switch (viewState) {
		case ViewState.create:
			return (
				<>
					<StrategyDetailView
						viewState={ViewState.create}
						actionIcon={faX}
						actionUrl={`/strategy`}
						title={title}
						setTitle={setTitle}
						onSubmit={(data) => {
							(async () => {
								try {
									setStatusError(null);
									setTitleError(null);
									setTemplateError(null);
									setCashInCentsError(null);
									setGeneralError(null);
									const dataParsed =
										StrategyTypes.StrategyPostSingleRequestBodyFromRaw(
											{
												...data,
											}
										);
									(async () => {
										try {
											const { data: thingy } =
												await blackdogConfiguratorClient
													.strategy()
													.postMany([
														{
															...dataParsed,
														},
													]);
											const strategiesCreated: StrategyTypes.StrategyResponseBodyDataInstance[] =
												[
													{
														id: thingy[0].id,
														status: "inactive",
														title: "Test this title out!",
														strategyTemplateName:
															"NoOp",
														cashInCents: 999,
													},
												];
											if (strategiesCreated.length < 1) {
												throw new Error(
													"Strategy strategyTemplateName not created."
												);
											}
											const newStrategy =
												strategiesCreated[0];
											navigate(
												`/strategy/${newStrategy.id}`
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
												case "title":
													setTitleError(
														issue.message
													);
													break;
												case "strategyTemplateName":
													setTemplateError(
														issue.message
													);
													break;
												case "cashInCents":
													setCashInCentsError(
														issue.message
													);
													break;
												default:
													generalErrors.push(
														`${issue.path} ${issue.message}`
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
						titleError={titleError}
						strategyTemplateNameError={strategyTemplateNameError}
						cashInCentsError={cashInCentsError}
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
					actionIcon={faX}
					actionUrl={`/strategy/${strategy.id}`}
					title={title}
					setTitle={setTitle}
					onSubmit={(data) => {
						(async () => {
							try {
								setStatusError(null);
								setTitleError(null);
								setTemplateError(null);
								setCashInCentsError(null);
								setGeneralError(null);
								const dataParsed =
									StrategyTypes.StrategyPutSingleRequestBodyFromRaw(
										{
											...data,
										}
									);
								(async () => {
									try {
										const { data: strategyCreated } =
											await blackdogConfiguratorClient
												.strategy()
												.patchSingle(
													{ id: strategy.id },
													{
														...dataParsed,
													}
												);
										navigate(
											`/strategy/${strategyCreated.id}`
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
											case "title":
												setTitleError(issue.message);
												break;
											case "strategyTemplateName":
												setTemplateError(issue.message);
												break;
											case "cashInCents":
												setCashInCentsError(
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
					status={strategy.status}
					strategyTemplateName={strategy.strategyTemplateName}
					cashInCents={strategy.cashInCents}
					generalError={generalError}
					statusError={statusError}
					titleError={titleError}
					strategyTemplateNameError={strategyTemplateNameError}
					cashInCentsError={cashInCentsError}
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
					actionIcon={faPenToSquare}
					actionUrl={`edit`}
					status={strategy.status}
					title={title}
					strategyTemplateName={strategy.strategyTemplateName}
					cashInCents={strategy.cashInCents}
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
