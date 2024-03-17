import React, { useRef, useState } from "react";
import { ViewState } from "../interfaces/viewState";
import {
	Strategy as StrategyTypes,
	StrategyTemplate as StrategyTemplateTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import TextInput from "./TextInput";
import DropdownInput from "./DropdownInput";
import CurrencyInput from "./CurrencyInput";
import Toggle from "./Toggle";
import { ToggleState } from "../interfaces/settings";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import LargeButton from "./LargeButton";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import NumericInput from "react-numeric-input";
import { bankersRounding, bankersRoundingTruncateToInt } from "../utils";

interface StrategyDetailFormProps {
	viewState?: ViewState;
	generalError?: string | null;
	status?: StrategyTypes.Status;
	statusError?: string | null;
	title?: string | null;
	titleError?: string | null;
	strategyTemplateName?: StrategyTemplateTypes.StrategyTemplateName | null;
	strategyTemplateNameError?: string | null;
	cashInCents?: number | null;
	cashInCentsError?: string | null;
	onSubmit?: (data: {
		status: string | null;
		title: string | null;
		strategyTemplateName: string | null;
		cashInCents: number | null;
	}) => void;
	actionIcon?: IconDefinition | null;
	actionUrl?: string | null;
}

const StrategyDetailForm: React.FC<StrategyDetailFormProps> = ({
	viewState = ViewState.view,
	generalError = null,
	status = "active",
	statusError = null,
	title = "",
	titleError = null,
	strategyTemplateName = null,
	strategyTemplateNameError = null,
	cashInCents = null,
	cashInCentsError = null,
	onSubmit = () => {},
	actionIcon = null,
	actionUrl = null,
}) => {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const strategyTemplateNameInputRef = useRef<HTMLSelectElement>(null);
	// const cashInCentsInputRef = useRef<HTMLInputElement>(null);
	const [cashInCentsInternal, setCashInCentsInternal] = useState(cashInCents);
	function setCashInCentsInternalFromCashInDollars(
		cashInDollars: number | null
	) {
		setCashInCentsInternal(
			cashInDollars
				? bankersRoundingTruncateToInt(cashInDollars * 100)
				: null
		);
	}
	const [statusInternal, setStatusInternal] = useState(status);
	return (
		<>
			<form
				className="flex flex-col gap-4 w-full"
				onSubmit={(e) => {
					e.preventDefault();
					console.log({
						status: statusInternal,
						title: titleInputRef.current?.value ?? "",
						strategyTemplateName:
							strategyTemplateNameInputRef.current?.value ?? "",
						cashInCents: cashInCentsInternal,
					});
					onSubmit({
						status: statusInternal,
						title: titleInputRef.current?.value ?? "",
						strategyTemplateName:
							strategyTemplateNameInputRef.current?.value ?? "",
						cashInCents: cashInCentsInternal,
					});
				}}
			>
				<div className="form-inputs grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{generalError ? <p>{generalError}</p> : null}
					{titleError ? <p>{titleError}</p> : null}
					<TextInput
						label="Title"
						name="title"
						ariaLabel="Title"
						defaultValue={title}
						ref={titleInputRef}
						isEditable={viewState !== ViewState.view}
					/>
					{strategyTemplateNameError ? (
						<p>{strategyTemplateNameError}</p>
					) : null}
					<DropdownInput
						label="Template"
						options={
							StrategyTemplateTypes.StrategyTemplateNameSchema
								.options
						}
						placeholder="Select a strategyTemplateName"
						defaultValue={strategyTemplateName}
						ref={strategyTemplateNameInputRef}
						isEditable={viewState !== ViewState.view}
					/>
					{cashInCentsError ? <p>{cashInCentsError}</p> : null}
					<CurrencyInput
						label="Designated Funds"
						name="cash"
						ariaLabel="Cash"
						// placeholder={cashInCents ? cashInCents.toString() : ""}
						// defaultValue={cashInCents ? cashInCents.toString() : ""}
						isEditable={viewState !== ViewState.view}
						onChange={(value, name, values) => {
							const valueFloatOrNull =
								value === undefined ? null : parseFloat(value);
							setCashInCentsInternalFromCashInDollars(
								valueFloatOrNull
							);
						}}
						defaultValue={
							cashInCentsInternal
								? bankersRounding(
										cashInCentsInternal / 100
								  ).toString()
								: ""
						}
					/>
				</div>
				<div className="form-toggles mb-4 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
						{" "}
						{statusError ? <p>{statusError}</p> : null}
						<Toggle
							toggleState={
								statusInternal === "active"
									? ToggleState.on
									: ToggleState.off
							}
							display={
								statusInternal === "active" ? (
									<FontAwesomeIcon
										icon={faCheck}
										className="text-sm transition-bg duration-1000"
									/>
								) : (
									<FontAwesomeIcon
										icon={faTimes}
										className="text-sm transition-bg duration-1000"
									/>
								)
							}
							labelText="Active?"
							onToggle={
								viewState !== ViewState.view
									? (togglestate) => {
											setStatusInternal(
												togglestate === ToggleState.on
													? "active"
													: "inactive"
											);
									  }
									: () => {}
							}
						/>
					</div>
				</div>
				{viewState !== ViewState.view ? (
					<button type="submit">Submit</button>
				) : null}
			</form>
			{viewState === ViewState.view ? (
				<Link to="strategyTemplate">
					<LargeButton icon={faFileLines} text="Templates" />
				</Link>
			) : null}
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

export default StrategyDetailForm;
