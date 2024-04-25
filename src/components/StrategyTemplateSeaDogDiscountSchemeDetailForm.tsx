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
import PasswordInput from "./PasswordInput";
import { StrategyTemplateSeaDogDiscountSchemeDetailFormModel } from "../interfaces/strategyTemplateSeaDogDiscountSchemeDetail";

interface StrategyTemplateSeaDogDiscountSchemeDetailFormProps {
	viewState: ViewState;
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	model: StrategyTemplateSeaDogDiscountSchemeDetailFormModel;
	actionIcon?: IconDefinition | null;
	actionUrl?: string | null;
	onChange?: (
		model: StrategyTemplateSeaDogDiscountSchemeDetailFormModel
	) => void;
	onSubmit?: (
		model: StrategyTemplateSeaDogDiscountSchemeDetailFormModel
	) => void;
}
const defaultStatus =
	StrategyTemplateSeaDogDiscountSchemeTypes.StatusSchema.Enum.active;
const StrategyTemplateSeaDogDiscountSchemeDetailForm: React.FC<
	StrategyTemplateSeaDogDiscountSchemeDetailFormProps
> = ({
	viewState,
	model,
	blackdogConfiguratorClient,
	actionIcon,
	actionUrl,
	onChange = () => {},
	onSubmit = () => {},
}) => {
	// const toggleState =
	// 	translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState(
	// 		statusInternal
	// 	);

	const toggleState =
		translateStrategyTemplateSeaDogDiscountSchemeStatusToToggleState(
			model.status ?? "active"
		);

	return (
		<>
			<form
				className="flex flex-col gap-4 w-full"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(model);
				}}
			>
				{model.generalError ? <p>{model.generalError}</p> : null}
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
						<Toggle
							isEditable={viewState !== ViewState.view}
							toggleState={toggleState}
							labelText="Active?"
							onChange={(newToggleState) => {
								onChange({
									...model,
									status: translateToggleStateToStrategyTemplateSeaDogDiscountSchemeStatus(
										newToggleState
									),
								});
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
						value={model.alpacaAPIKey}
						isEditable={viewState !== ViewState.view}
						error={model.alpacaAPIKeyError ?? ""}
						onChange={(value) => {
							onChange({
								...model,
								alpacaAPIKey: value,
							});
						}}
					/>
					<PasswordInput
						label="Alpaca API Secret"
						name="alpacaAPISecret"
						ariaLabel="Alpaca API Secret"
						id="alpacaAPISecret"
						value={model.alpacaAPISecret}
						isEditable={viewState !== ViewState.view}
						error={model.alpacaAPISecretError ?? ""}
						onChange={(value) => {
							onChange({
								...model,
								alpacaAPISecret: value,
							});
						}}
					/>
					<CheckboxInput
						label="Alpaca API Paper"
						name="alpacaAPIPaper"
						ariaLabel="Alpaca API Paper"
						checked={model.alpacaAPIPaper ?? true}
						id="alpacaAPIPaper"
						error={model.alpacaAPIPaperError ?? ""}
						isEditable={viewState !== ViewState.view}
						onChange={(value) => {
							onChange({
								...model,
								alpacaAPIPaper: value,
							});
						}}
					/>
					<NumberInput
						label="Buy At Percentile"
						name="buyAtPercentile"
						ariaLabel="Buy At Percentile"
						id="buyAtPercentile"
						placeholder={"0.00"}
						value={model.buyAtPercentile}
						precision={15}
						isEditable={viewState !== ViewState.view}
						isPercentage={true}
						error={model.buyAtPercentileError ?? ""}
						onChange={(value) => {
							onChange({
								...model,
								buyAtPercentile: value,
							});
						}}
					/>
					<NumberInput
						label="Sell At Percentile"
						name="sellAtPercentile"
						ariaLabel="Sell At Percentile"
						id="sellAtPercentile"
						placeholder={"0.00"}
						precision={15}
						value={model.sellAtPercentile}
						isEditable={viewState !== ViewState.view}
						isPercentage={true}
						error={model.sellAtPercentileError ?? ""}
						onChange={(value) => {
							onChange({
								...model,
								sellAtPercentile: value,
							});
						}}
					/>
					<NumberInput
						label="Minimum Gain Percent"
						name="MinimumGainPercent"
						ariaLabel="Minimum Gain Percent"
						id="minimumGainPercent"
						placeholder={"0.00"}
						precision={15}
						value={model.minimumGainPercent}
						isEditable={viewState !== ViewState.view}
						isPercentage={true}
						error={model.minimumGainPercentError ?? ""}
						onChange={(value) => {
							onChange({
								...model,
								minimumGainPercent: value,
							});
						}}
					/>
					<NumberInput
						label="Timeframe In Days"
						name="timeframeInDays"
						ariaLabel="Timeframe In Days"
						id="timeframeInDays"
						value={model.timeframeInDays}
						precision={15} // Becuase JavaScript Number precision is 15
						scale={0}
						isEditable={viewState !== ViewState.view}
						error={model.timeframeInDaysError ?? ""}
						onChange={(value) => {
							onChange({
								...model,
								timeframeInDays: value,
							});
						}}
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
							{model.symbolIdsError ? (
								<p>{model.symbolIdsError}</p>
							) : null}
							<SymbolRepeater
								viewState={viewState}
								blackdogConfiguratorClient={
									blackdogConfiguratorClient
								}
								symbolIds={model.symbolIds ?? []}
								setSymbolIds={(newSymbolIds) => {
									onChange({
										...model,
										symbolIds: newSymbolIds,
									});
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
