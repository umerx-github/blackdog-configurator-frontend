import {
	ConfigInterface,
	NewConfigRequestInterface,
	NewSymbolInterface,
	SymbolInterface,
} from "./common";

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
export interface SymbolEndpointInterface {
	get(): Promise<SymbolInterface[]>;
	getByName(name: string): Promise<SymbolInterface>;
	post(symbol: NewSymbolInterface): Promise<SymbolInterface>;
}
export interface ConfigEndpointInterface {
	get(): Promise<ConfigInterface[]>;
	getActive(): Promise<ConfigInterface>;
	post(config: NewConfigRequestInterface): Promise<ConfigInterface>;
}
