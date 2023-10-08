import Credential from "./credential.js";
import {
	APIInterface,
	CredentialInterface,
} from "../../../interfaces/lib/backend/api/index.js";
import SymbolEndpoint from "./symbol.js";
import ConfigEndpoint from "./config.js";
export class API implements APIInterface {
	constructor(public credentials: CredentialInterface) {}
	getURL() {
		return this.credentials.getURL();
	}
	getSymbolEndpoint() {
		return new SymbolEndpoint(this.credentials, "symbol");
	}
	getConfigEndpoint() {
		return new ConfigEndpoint(this.credentials, "config");
	}
}
// import.meta.env.VITE_TEST_VAR
export default new API(
	new Credential(
		import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_SCHEME,
		import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_HOST,
		import.meta.env.VITE_BLACKDOG_CONFIGURATOR_BACKEND_PORT
	)
);
