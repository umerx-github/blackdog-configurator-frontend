export interface APIInterface {
	getURL(): string;
	getSymbolEndpoint(): SymbolEndpointInterface;
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
}
export interface SymbolEndpointInterface {
	get(): Promise<SymbolInterface[]>;
	post(symbol: { name: string }): Promise<SymbolInterface>;
}
