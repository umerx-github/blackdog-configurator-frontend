import { CredentialInterface } from "../../../interfaces/backend/api";
export default class Credential implements CredentialInterface {
	constructor(
		public scheme: string,
		public host: string,
		public port: number | null = null
	) {}
	getURL() {
		return `${this.scheme}://${this.host}${
			this.port ? `:${this.port.toString()}` : ``
		}`;
	}
}
