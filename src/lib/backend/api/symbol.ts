import {
	CredentialInterface,
	ResponseBase,
	SymbolEndpointInterface,
	SymbolInterface,
} from "../../../interfaces/lib/backend/api";

export default class SymbolEndpoint implements SymbolEndpointInterface {
	constructor(
		public credentials: CredentialInterface,
		public endpoint: string
	) {}
	async get(): Promise<SymbolInterface[]> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}`
		);
		const symbols: ResponseBase<SymbolInterface[]> = await response.json();
		if (symbols.status !== "success") throw new Error(symbols.message);
		return symbols.data;
	}
	async post(symbol: { name: String }): Promise<SymbolInterface> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(symbol),
			}
		);
		const newSymbol: ResponseBase<SymbolInterface> = await response.json();
		if (newSymbol.status !== "success") throw new Error(newSymbol.message);
		return newSymbol.data;
	}
}
