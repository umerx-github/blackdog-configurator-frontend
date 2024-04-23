import { StrategyTemplateSeaDogDiscountScheme as StrategyTemplateSeaDogDiscountSchemeTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";

export interface StrategyTemplateSeaDogDiscountSchemeDetailFormModel {
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
}
