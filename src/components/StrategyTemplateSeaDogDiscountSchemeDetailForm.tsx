import React, { useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { ViewState } from "../interfaces/viewState";
import { StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SymbolRepeater from "./inputs-and-outputs/SymbolRepeater";
import Toggle from "./Toggle";
import TextInput from "./TextInput";
import CheckboxInput from "./CheckboxInput";
import NumberInput from "./NumberInput";
import ToggleInnerCheckAndX from "./ToggleInnerCheckAndX";
import {
	translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState,
	translateToggleStateToStrategyTemplateSeaDogDiscountSchemeStatus,
} from "../utils";

interface StrategyTemplateSeaDogDiscountSchemeDetailFormProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState?: ViewState;
	generalError?: string | null;
	status?: StrategyTemplateSeaDogDiscountSchemeTypes.Status;
	statusError?: string | null;
	alpacaAPIKey?: string;
	alpacaAPIKeyError?: string | null;
	alpacaAPISecret?: string;
	alpacaAPISecretError?: string | null;
	alpacaAPIPaper?: boolean;
	alpacaAPIPaperError?: string | null;
	buyAtPercentile?: number | null;
	buyAtPercentileError?: string | null;
	sellAtPercentile?: number | null;
	sellAtPercentileError?: string | null;
	minimumGainPercent?: number | null;
	minimumGainPercentError?: string | null;
	timeframeInDays?: number | null;
	timeframeInDaysError?: string | null;
	symbolIds?: number[];
	symbolIdsError?: string | null;
	onSubmit?: (data: {
		status: string | null;
		alpacaAPIKey: string | null;
		alpacaAPISecret: string | null;
		alpacaAPIPaper: boolean | null;
		buyAtPercentile: number | null;
		sellAtPercentile: number | null;
		minimumGainPercent: number | null;
		timeframeInDays: number | null;
		symbolIds: number[];
	}) => void;
	actionIcon?: IconDefinition | null;
	actionUrl?: string | null;
}
// "status": "active",
// "alpacaAPIKey": "key",
// "alpacaAPISecret": "secret",
// "alpacaAPIPaper": true,
// "buyAtPercentile": 10,
// "sellAtPercentile": 50,
// "minimumGainPercent": 10,
// "timeframeInDays": 90,
// "symbolIds": [
// 	1,
// 	2
// ]

const StrategyTemplateSeaDogDiscountSchemeDetailForm: React.FC<
	StrategyTemplateSeaDogDiscountSchemeDetailFormProps
> = ({
	blackdogConfiguratorClient,
	viewState = ViewState.view,
	generalError = null,
	status = "active",
	statusError = null,
	alpacaAPIKey = "",
	alpacaAPIKeyError = null,
	alpacaAPISecret = "",
	alpacaAPISecretError = null,
	alpacaAPIPaper = true,
	alpacaAPIPaperError = null,
	buyAtPercentile = null,
	buyAtPercentileError = null,
	sellAtPercentile = null,
	sellAtPercentileError = null,
	minimumGainPercent = null,
	minimumGainPercentError = null,
	timeframeInDays = null,
	timeframeInDaysError = null,
	symbolIds = [],
	symbolIdsError = null,
	onSubmit = () => {},
	actionIcon = null,
	actionUrl = null,
}) => {
	const [alpacaAPIKeyInputValue, setAlpacaAPIKeyInputValue] =
		useState<string>(alpacaAPIKey);
	const [alpacaAPISecretInputValue, setAlpacaAPISecretInputValue] =
		useState<string>(alpacaAPISecret);
	const [alpacaAPIPaperInputValue, setAlpacaAPIPaperInputValue] =
		useState<boolean>(alpacaAPIPaper);
	const [buyAtPercentileInputValue, setBuyAtPercentileInputValue] = useState<
		number | null
	>(buyAtPercentile);
	const [sellAtPercentileInputValue, setSellAtPercentileInputValue] =
		useState<number | null>(sellAtPercentile);
	const [minimumGainPercentInputValue, setMinimumGainPercentInputValue] =
		useState<number | null>(minimumGainPercent);
	const [timeframeInDaysInputValue, setTimeframeInDaysInputValue] = useState<
		number | null
	>(timeframeInDays);
	const [symbolIdsInternal, setSymbolIdsInternal] =
		useState<number[]>(symbolIds);
	const [statusInternal, setStatusInternal] =
		useState<StrategyTemplateSeaDogDiscountSchemeTypes.Status>(status);

	const toggleState =
		translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState(
			statusInternal
		);

	return (
		<>
			<form
				className="flex flex-col gap-4 w-full"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit({
						status: statusInternal,
						alpacaAPIKey: alpacaAPIKeyInputValue,
						alpacaAPISecret: alpacaAPISecretInputValue,
						alpacaAPIPaper: alpacaAPIPaperInputValue,
						buyAtPercentile: buyAtPercentileInputValue,
						sellAtPercentile: sellAtPercentileInputValue,
						minimumGainPercent: minimumGainPercentInputValue,
						timeframeInDays: timeframeInDaysInputValue,
						symbolIds: symbolIdsInternal,
					});
				}}
			>
				{generalError ? <p>{generalError}</p> : null}
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
						<Toggle
							isEditable={viewState !== ViewState.view}
							toggleState={toggleState}
							labelText="Active?"
							onChange={(newToggleState) => {
								setStatusInternal(
									translateToggleStateToStrategyTemplateSeaDogDiscountSchemeStatus(
										newToggleState
									)
								);
							}}
						>
							<ToggleInnerCheckAndX toggleState={toggleState} />
						</Toggle>
					</div>
					<TextInput
						label="Alpaca API Key"
						name="alpacaAPIKey"
						ariaLabel="Alpaca API Key"
						id="alpacaAPIKey"
						defaultValue={alpacaAPIKey}
						isEditable={viewState !== ViewState.view}
						error={alpacaAPIKeyError ?? ""}
						OnChange={setAlpacaAPIKeyInputValue}
					/>
					<TextInput
						label="Alpaca API Secret"
						name="alpacaAPISecret"
						ariaLabel="Alpaca API Secret"
						id="alpacaAPISecret"
						defaultValue={alpacaAPISecret}
						isEditable={viewState !== ViewState.view}
						error={alpacaAPISecretError ?? ""}
						OnChange={setAlpacaAPISecretInputValue}
					/>
					<CheckboxInput
						label="Alpaca API Paper"
						name="alpacaAPIPaper"
						ariaLabel="Alpaca API Paper"
						defaultChecked={alpacaAPIPaper}
						id="alpacaAPIPaper"
						error={alpacaAPIPaperError ?? ""}
						isEditable={viewState !== ViewState.view}
						onChange={setAlpacaAPIPaperInputValue}
					/>
					<NumberInput
						label="Buy At Percentile"
						name="buyAtPercentile"
						ariaLabel="Buy At Percentile"
						id="buyAtPercentile"
						placeholder={"0.00"}
						defaultValue={buyAtPercentile}
						precision={15}
						isEditable={viewState !== ViewState.view}
						error={buyAtPercentileError ?? ""}
						onChange={setBuyAtPercentileInputValue}
					/>
					<NumberInput
						label="Sell At Percentile"
						name="sellAtPercentile"
						ariaLabel="Sell At Percentile"
						id="sellAtPercentile"
						placeholder={"0.00"}
						precision={15}
						defaultValue={sellAtPercentile}
						isEditable={viewState !== ViewState.view}
						error={sellAtPercentileError ?? ""}
						onChange={setSellAtPercentileInputValue}
					/>
					<NumberInput
						label="Minimum Gain Percent"
						name="MinimumGainPercent"
						ariaLabel="Minimum Gain Percent"
						id="minimumGainPercent"
						placeholder={"0.00"}
						precision={15}
						defaultValue={minimumGainPercent}
						isEditable={viewState !== ViewState.view}
						error={minimumGainPercentError ?? ""}
						onChange={setMinimumGainPercentInputValue}
					/>
					<NumberInput
						label="Timeframe In Days"
						name="timeframeInDays"
						ariaLabel="Timeframe In Days"
						id="timeframeInDays"
						defaultValue={timeframeInDays}
						precision={15} // Becuase JavaScript Number precision is 15
						scale={0}
						isEditable={viewState !== ViewState.view}
						error={timeframeInDaysError ?? ""}
						onChange={setTimeframeInDaysInputValue}
					/>
					<label className="flex flex-col">
						<span
							className={`text-zinc-500 dark:text-zinc-400 text-sm ${
								viewState !== ViewState.view ? "mb-2" : ""
							}`}
						>
							Symbol IDs
						</span>
						<span
							className={`${
								viewState !== ViewState.view
									? "bg-zinc-100 dark:bg-zinc-800"
									: ""
							}`}
						>
							{symbolIdsError ? <p>{symbolIdsError}</p> : null}
							<SymbolRepeater
								viewState={viewState}
								blackdogConfiguratorClient={
									blackdogConfiguratorClient
								}
								symbolIds={symbolIdsInternal}
								setSymbolIds={(newSymbolIds) => {
									setSymbolIdsInternal(newSymbolIds);
								}}
							></SymbolRepeater>
						</span>
					</label>
				</div>
				{viewState !== ViewState.view ? (
					<button type="submit">Submit</button>
				) : null}
			</form>
			{actionIcon && actionUrl ? (
				<div className="absolute bottom-4 right-4">
					<Link to={actionUrl}>
						<FontAwesomeIcon
							icon={actionIcon}
							className="text-4xl text-zinc-600 dark:text-zinc-400 transition-bg duration-1000"
						/>
					</Link>
				</div>
			) : null}
		</>
	);
};

export default StrategyTemplateSeaDogDiscountSchemeDetailForm;
