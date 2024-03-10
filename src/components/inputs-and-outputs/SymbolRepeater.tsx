import { ViewState } from "../../interfaces/viewState";
import SymbolRepeaterInput from "./inputs/SymbolRepeater";
import SymbolRepeaterOutput from "./outputs/SymbolRepeater";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";

interface SymbolRepeaterProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState?: ViewState;
	symbolIds: number[];
	setSymbolIds: (symbolIds: number[]) => void;
}

export default function SymbolRepeater({
	blackdogConfiguratorClient,
	viewState,
	symbolIds,
	setSymbolIds,
}: SymbolRepeaterProps) {
	if (viewState === ViewState.view) {
		return (
			<div>
				<SymbolRepeaterOutput
					blackdogConfiguratorClient={blackdogConfiguratorClient}
					symbolIds={symbolIds}
				/>
			</div>
		);
	}
	return (
		<div>
			<SymbolRepeaterInput
				blackdogConfiguratorClient={blackdogConfiguratorClient}
				symbolIds={symbolIds}
				setSymbolIds={setSymbolIds}
			/>
		</div>
	);
}
