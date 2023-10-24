import {
	CredentialInterface,
	SymbolEndpointInterface,
} from "../../../interfaces/lib/backend/api";
import {
	ResponseBase,
	SymbolInterface,
} from "../../../interfaces/lib/backend/api/common";
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
	async getByName(name: string): Promise<SymbolInterface> {
		const params = new URLSearchParams({ name });
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}${params.toString()}`
		);
		const responseBody: ResponseBase<SymbolInterface> =
			await response.json();
		if (responseBody.status !== "success")
			throw new Error(responseBody.message);
		return responseBody.data;
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
