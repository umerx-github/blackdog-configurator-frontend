import Credential from "./credential.js";
import {
	APIInterface,
	CredentialInterface,
} from "../../../interfaces/backend/api";
import SymbolEndpoint from "./symbols";
export class API implements APIInterface {
	constructor(public credentials: CredentialInterface) {}
	getURL() {
		return this.credentials.getURL();
	}
	getSymbolEndpoint() {
		return new SymbolEndpoint(this.credentials, "symbol");
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
