import React, { useContext, useEffect, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { Strategy as StrategyTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { ViewState } from "../interfaces/viewState";
import { useNavigate, useParams } from "react-router-dom";
import StrategyDetailForm from "../components/StrategyDetailForm";
import z, { ZodError } from "zod";
import BreadcrumbsContext from "../components/BreadcrumbsContext";

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
	const [titleError, setTitleError] = useState<string | null>(null);
	const [strategyTemplateNameError, setTemplateError] = useState<
		string | null
	>(null);
	const [cashInCentsError, setCashInCentsError] = useState<string | null>(
		null
	);
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
			if (null !== strategyId) {
				const strategyFetched = await blackdogConfiguratorClient
					.strategy()
					.getSingle({ id: strategyId });
				setStrategy(strategyFetched);
			}
		})();
	}, [strategyId]);
	switch (viewState) {
		case ViewState.create:
			return (
				<>
					<StrategyDetailForm
						viewState={ViewState.create}
						actionIcon={faX}
						actionUrl={`/strategy`}
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
											const strategiesCreated =
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
											navigate(
												`/strategy/${strategiesCreated[0].id}`
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
					></StrategyDetailForm>
				</>
			);
		case ViewState.edit:
			if (!strategy) {
				return <></>;
			}
			return (
				<StrategyDetailForm
					viewState={ViewState.edit}
					actionIcon={faX}
					actionUrl={`/strategy/${strategy.id}`}
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
										const strategyCreated =
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
					title={strategy.title}
					strategyTemplateName={strategy.strategyTemplateName}
					cashInCents={strategy.cashInCents}
					generalError={generalError}
					statusError={statusError}
					titleError={titleError}
					strategyTemplateNameError={strategyTemplateNameError}
					cashInCentsError={cashInCentsError}
				></StrategyDetailForm>
			);
		case ViewState.view:
			if (!strategy) {
				return <></>;
			}
			return (
				<StrategyDetailForm
					viewState={ViewState.view}
					actionIcon={faPenToSquare}
					actionUrl={`edit`}
					status={strategy.status}
					title={strategy.title}
					strategyTemplateName={strategy.strategyTemplateName}
					cashInCents={strategy.cashInCents}
				></StrategyDetailForm>
			);
		default:
			return <>Default</>;
	}
};

export default StrategyDetail;
