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
export interface SymbolInterface {
	id: number;
	name: string;
	createdAt: string;
}

export interface OrderedSymbolInterface extends SymbolInterface {
	order: number;
}

export interface NewSymbolInterface {
	name: string;
}

export interface ConfigInterfaceRequired {
	sellAtPercentile: number;
	buyAtPercentile: number;
	sellTrailingPercent: number;
	buyTrailingPercent: number;
	timeframeInDays: number;
}
export interface ConfigInterface extends ConfigInterfaceRequired {
	id: number;
	isActive: boolean;
	createdAt: string;
	symbols: OrderedSymbolInterface[];
}
export interface NewConfigInterface extends ConfigInterfaceRequired {
	isActive?: boolean;
	symbols?: OrderedSymbolInterface[];
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
