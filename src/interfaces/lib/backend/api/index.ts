export type ResponseBase<T> =
	| { status: "success"; message: string; data: T }
	| { status: "error"; message: string };

export interface APIInterface {
	getURL(): string;
	getSymbolEndpoint(): SymbolEndpointInterface;
	getConfigEndpoint(): ConfigEndpointInterface;
}
export interface CredentialInterface {
	scheme: string;
	host: string;
	port: number | null;
	getURL(): string;
}
export interface NewConfigRequestInterface {
	isActive?: boolean;
	symbols?: OrderedSymbolInterface[];
	sellAtPercentile: number;
	buyAtPercentile: number;
	buyTrailingPercent: number;
	sellTrailingPercent: number;
	timeframeInDays: number;
	alpacaApiKey: string;
	alpacaApiSecret: string;
	cashInDollars: number;
}
export interface NewConfigInterface {
	isActive?: boolean;
	symbols?: OrderedSymbolInterface[];
	sellAtPercentile?: number;
	buyAtPercentile?: number;
	sellTrailingPercent?: number;
	buyTrailingPercent?: number;
	timeframeInDays?: number;
	alpacaApiKey?: string;
	alpacaApiSecret?: string;
	cashInCents?: number;
}
export interface ConfigInterface {
	id: number;
	createdAt: string;
	isActive: boolean;
	symbols: OrderedSymbolInterface[];
	sellAtPercentile: number;
	buyAtPercentile: number;
	buyTrailingPercent: number;
	sellTrailingPercent: number;
	timeframeInDays: number;
	alpacaApiKey: string;
	alpacaApiSecret: string;
	cashInCents: number;
	cashInDollars: number;
}
export interface SymbolEndpointInterface {
	get(): Promise<SymbolInterface[]>;
	post(symbol: NewSymbolInterface): Promise<SymbolInterface>;
}
export interface ConfigEndpointInterface {
	get(): Promise<ConfigInterface[]>;
	getActive(): Promise<ConfigInterface>;
	post(config: NewConfigInterface): Promise<ConfigInterface>;
}

export interface NewSymbolRequestInterface {
	name: string;
}
export interface NewSymbolInterface {
	name: string;
}

export interface SymbolInterface {
	id: number;
	createdAt: string;
	name: string;
}

export interface OrderedSymbolInterface extends SymbolInterface {
	order: number;
}
