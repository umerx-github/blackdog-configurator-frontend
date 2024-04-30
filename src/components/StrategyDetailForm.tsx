import React, { useRef, useState } from "react";
import { ViewState } from "../interfaces/viewState";
import {
	Strategy as StrategyTypes,
	StrategyTemplate as StrategyTemplateTypes,
	StrategyTemplate,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import TextInput from "./inputs-and-outputs/inputs/TextInput";
import DropdownInput from "./inputs-and-outputs/inputs/DropdownInput";
import CurrencyInput from "./inputs-and-outputs/inputs/CurrencyInput";
import Toggle from "./toggle/Toggle";
import {
	translateStrategyStatusToToggleState,
	translateToggleStateToStrategyStatus,
} from "../utils";
import ToggleInnerCheckAndX from "./toggle/ToggleInnerCheckAndX";
import { StrategyDetailFormModel } from "../interfaces/strategyDetail";
import { SourceTextModule } from "vm";

interface StrategyDetailFormProps {
	viewState: ViewState;
	model: StrategyDetailFormModel;
	onChange?: (model: StrategyDetailFormModel) => void;
	onSubmit?: (model: StrategyDetailFormModel) => void;
}
const defaultStatus = StrategyTypes.StatusSchema.Enum.active;
const StrategyDetailForm: React.FC<StrategyDetailFormProps> = ({
	viewState,
	model,
	onChange = () => {},
	onSubmit = () => {},
}) => {
	return (
		<>
			<form
				className="flex flex-col gap-4 w-full"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(model);
				}}
			>
				<div className="form-inputs grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{model.generalError ? <p>{model.generalError}</p> : null}
					{model.titleError ? <p>{model.titleError}</p> : null}
					<TextInput
						label="Title"
						name="title"
						ariaLabel="Title"
						value={model.title}
						onChange={(title) =>
							onChange({
								...model,
								title,
							})
						}
						isEditable={viewState !== ViewState.view}
					/>
					{model.strategyTemplateNameError ? (
						<p>{model.strategyTemplateNameError}</p>
					) : null}
					<DropdownInput
						label="Template"
						options={
							StrategyTemplateTypes.StrategyTemplateNameSchema
								.options
						}
						placeholder="Select a strategyTemplateName"
						value={model.strategyTemplateName}
						onChange={(newStrategyTemplateName) => {
							// validate that newStrategyTemplateName is a valid option from the schema
							try {
								const strategyTemplateName =
									StrategyTemplateTypes.StrategyTemplateNameSchema.parse(
										newStrategyTemplateName
									);
								onChange({
									...model,
									strategyTemplateName,
								});
							} catch (e) {
								onChange({
									...model,
									strategyTemplateName: null,
									strategyTemplateNameError:
										"Invalid strategyTemplateName",
								});
							}
						}}
						isEditable={viewState !== ViewState.view}
					/>
					{model.cashInCentsError ? (
						<p>{model.cashInCentsError}</p>
					) : null}
					<CurrencyInput
						label="Designated Funds"
						name="cash"
						ariaLabel="Cash"
						placeholder={"0.00"}
						precision={15}
						isEditable={viewState !== ViewState.view}
						onChange={(cashInCents) =>
							onChange({
								...model,
								cashInCents,
							})
						}
						valueInCents={model.cashInCents ?? undefined}
					/>
				</div>
				<div className="form-toggles mb-4 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-700 transition-bg duration-1000">
						{" "}
						{model.statusError ? <p>{model.statusError}</p> : null}
						<Toggle
							isEditable={viewState !== ViewState.view}
							toggleState={translateStrategyStatusToToggleState(
								model.status ?? defaultStatus
							)}
							labelText="Active?"
							onChange={(toggleState) =>
								onChange({
									...model,
									status: translateToggleStateToStrategyStatus(
										toggleState
									),
								})
							}
						>
							<ToggleInnerCheckAndX
								toggleState={translateStrategyStatusToToggleState(
									model.status ?? defaultStatus
								)}
							/>
						</Toggle>
					</div>
				</div>
				{viewState !== ViewState.view ? (
					<button type="submit">Submit</button>
				) : null}
			</form>
		</>
	);
};

export default StrategyDetailForm;
