import {
	ConfigInterface,
	NewConfigInterface,
	ResponseBase,
	NewConfigRequestInterface,
	UpdateConfigRequestInterface,
} from "../../../interfaces/lib/backend/api/common";

import {
	CredentialInterface,
	ConfigEndpointInterface,
} from "../../../interfaces/lib/backend/api";

export default class ConfigEndpoint implements ConfigEndpointInterface {
	constructor(
		public credentials: CredentialInterface,
		public endpoint: string
	) {}
	async get(): Promise<ConfigInterface[]> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}`
		);
		const configs: ResponseBase<ConfigInterface[]> = await response.json();
		if (configs.status !== "success") throw new Error(configs.message);
		return configs.data;
	}
	async getById(id: number): Promise<ConfigInterface> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}/${id}`
		);
		const configs: ResponseBase<ConfigInterface> = await response.json();
		if (configs.status !== "success") throw new Error(configs.message);
		return configs.data;
	}
	async post(config: NewConfigRequestInterface): Promise<ConfigInterface> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(config),
			}
		);
		const newConfig: ResponseBase<ConfigInterface> = await response.json();
		if (newConfig.status !== "success") throw new Error(newConfig.message);
		return newConfig.data;
	}
	async patchById(id: number, data: UpdateConfigRequestInterface) {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const responseBody: ResponseBase<ConfigInterface> =
			await response.json();
		if (responseBody.status !== "success")
			throw new Error(responseBody.message);
		return responseBody.data;
	}
	async getActive(): Promise<ConfigInterface> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}/active`
		);
		const config: ResponseBase<ConfigInterface> = await response.json();
		if (config.status !== "success") throw new Error(config.message);
		return config.data;
	}
}
