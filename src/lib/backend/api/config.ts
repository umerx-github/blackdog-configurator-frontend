import {
	CredentialInterface,
	ConfigEndpointInterface,
	ConfigInterface,
	NewConfigInterface,
	ResponseBase,
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
	async post(config: NewConfigInterface): Promise<ConfigInterface> {
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
	async getActive(): Promise<ConfigInterface> {
		const response = await fetch(
			`${this.credentials.getURL()}/${this.endpoint}/active`
		);
		const config: ResponseBase<ConfigInterface> = await response.json();
		if (config.status !== "success") throw new Error(config.message);
		return config.data;
	}
}
