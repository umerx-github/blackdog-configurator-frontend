import React from "react";
import { ViewState } from "../interfaces/viewState";
import { StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StrategyTemplateSeaDogDiscountSchemeDetailFormProps {
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
	const statusInputRef = React.useRef<HTMLSelectElement>(null);
	const alpacaAPIKeyInputRef = React.useRef<HTMLInputElement>(null);
	const alpacaAPISecretInputRef = React.useRef<HTMLInputElement>(null);
	const alpacaAPIPaperInputRef = React.useRef<HTMLInputElement>(null);
	const buyAtPercentileInputRef = React.useRef<HTMLInputElement>(null);
	const sellAtPercentileInputRef = React.useRef<HTMLInputElement>(null);
	const minimumGainPercentInputRef = React.useRef<HTMLInputElement>(null);
	const timeframeInDaysInputRef = React.useRef<HTMLInputElement>(null);
	const symbolIdsInputRef = React.useRef<HTMLInputElement>(null);
	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log("onSubmit");
					onSubmit({
						status: statusInputRef.current?.value ?? null,
						alpacaAPIKey:
							alpacaAPIKeyInputRef.current?.value ?? null,
						alpacaAPISecret:
							alpacaAPISecretInputRef.current?.value ?? null,
						alpacaAPIPaper:
							alpacaAPIPaperInputRef.current?.checked ?? null,
						buyAtPercentile:
							buyAtPercentileInputRef.current?.value !==
								undefined &&
							buyAtPercentileInputRef.current?.value !== ""
								? parseFloat(
										buyAtPercentileInputRef.current?.value
								  )
								: null,
						sellAtPercentile:
							sellAtPercentileInputRef.current?.value !==
								undefined &&
							sellAtPercentileInputRef.current?.value !== ""
								? parseFloat(
										sellAtPercentileInputRef.current?.value
								  )
								: null,
						minimumGainPercent:
							minimumGainPercentInputRef.current?.value !==
								undefined &&
							minimumGainPercentInputRef.current?.value !== ""
								? parseFloat(
										minimumGainPercentInputRef.current
											?.value
								  )
								: null,
						timeframeInDays:
							timeframeInDaysInputRef.current?.value !==
								undefined &&
							timeframeInDaysInputRef.current?.value !== ""
								? parseFloat(
										timeframeInDaysInputRef.current?.value
								  )
								: null,
						symbolIds:
							symbolIdsInputRef.current?.value
								.split(",")
								.map((id) => parseInt(id, 10)) ?? [],
					});
				}}
			>
				{generalError ? <p>{generalError}</p> : null}
				<dl>
					<dt>Status</dt>
					<dd>
						{statusError ? <p>{statusError}</p> : null}
						<select
							ref={statusInputRef}
							name="status"
							id="status"
							defaultValue={status}
							disabled={viewState === ViewState.view}
						>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</dd>
				</dl>
				<dl>
					<dt>Alpaca API Key</dt>
					<dd>
						{alpacaAPIKeyError ? <p>{alpacaAPIKeyError}</p> : null}
						<input
							ref={alpacaAPIKeyInputRef}
							type="text"
							name="alpacaAPIKey"
							id="alpacaAPIKey"
							defaultValue={alpacaAPIKey}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Alpaca API Secret</dt>
					<dd>
						{alpacaAPISecretError ? (
							<p>{alpacaAPISecretError}</p>
						) : null}
						<input
							ref={alpacaAPISecretInputRef}
							type="text"
							name="alpacaAPISecret"
							id="alpacaAPISecret"
							defaultValue={alpacaAPISecret}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Alpaca API Paper</dt>
					<dd>
						{alpacaAPIPaperError ? (
							<p>{alpacaAPIPaperError}</p>
						) : null}
						<input
							ref={alpacaAPIPaperInputRef}
							type="checkbox"
							name="alpacaAPIPaper"
							id="alpacaAPIPaper"
							defaultChecked={alpacaAPIPaper}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Buy At Percentile</dt>
					<dd>
						{buyAtPercentileError ? (
							<p>{buyAtPercentileError}</p>
						) : null}
						<input
							ref={buyAtPercentileInputRef}
							type="number"
							name="buyAtPercentile"
							id="buyAtPercentile"
							defaultValue={buyAtPercentile ?? ""}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Sell At Percentile</dt>
					<dd>
						{sellAtPercentileError ? (
							<p>{sellAtPercentileError}</p>
						) : null}
						<input
							ref={sellAtPercentileInputRef}
							type="number"
							name="sellAtPercentile"
							id="sellAtPercentile"
							defaultValue={sellAtPercentile ?? ""}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Minimum Gain Percent</dt>
					<dd>
						{minimumGainPercentError ? (
							<p>{minimumGainPercentError}</p>
						) : null}
						<input
							ref={minimumGainPercentInputRef}
							type="number"
							name="minimumGainPercent"
							id="minimumGainPercent"
							defaultValue={minimumGainPercent ?? ""}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Timeframe In Days</dt>
					<dd>
						{timeframeInDaysError ? (
							<p>{timeframeInDaysError}</p>
						) : null}
						<input
							ref={timeframeInDaysInputRef}
							type="number"
							name="timeframeInDays"
							id="timeframeInDays"
							defaultValue={timeframeInDays ?? ""}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<dl>
					<dt>Symbol IDs</dt>
					<dd>
						{symbolIdsError ? <p>{symbolIdsError}</p> : null}
						<input
							ref={symbolIdsInputRef}
							type="text"
							name="symbolIds"
							id="symbolIds"
							defaultValue={symbolIds.join(",")}
							disabled={viewState === ViewState.view}
						/>
					</dd>
				</dl>
				<button type="submit">Submit</button>
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
