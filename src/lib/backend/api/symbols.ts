import {
	CredentialInterface,
	SymbolEndpointInterface,
	SymbolInterface,
} from "../../../interfaces/backend/api";

export default class SymbolEndpoint implements SymbolEndpointInterface {
	constructor(
		public credentials: CredentialInterface,
		public endpoint: string
	) {}
	async get(): Promise<SymbolInterface[]> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}`
		);
		const symbols = await response.json();
		return symbols as SymbolInterface[];
	}
	async post(symbol: { name: String }): Promise<SymbolInterface> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}`,
			{
				method: "POST",
				body: JSON.stringify(symbol),
			}
		);
		const newSymbol = await response.json();
		return newSymbol as SymbolInterface;
	}
}
