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
export interface ConfigInterface {
	id: number;
	isActive: boolean;
	createdAt: string;
	symbols: OrderedSymbolInterface[];
	sellAtPercentile: number;
}
export interface NewConfigInterface {
	isActive?: boolean;
	symbols?: OrderedSymbolInterface[];
	sellAtPercentile: number;
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
