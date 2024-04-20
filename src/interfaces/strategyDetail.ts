import {
	Strategy as StrategyTypes,
	StrategyTemplate as StrategyTemplateTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
export interface StrategyDetailFormModel {
	generalError?: string | null;
	status?: StrategyTypes.Status;
	statusError?: string | null;
	title?: string | null;
	titleError?: string | null;
	strategyTemplateName?: StrategyTemplateTypes.StrategyTemplateName | null;
	strategyTemplateNameError?: string | null;
	cashInCents?: number | null;
	cashInCentsError?: string | null;
}
