import { ViewState } from "../Interfaces/viewState";
import React, { useEffect, useContext, useState } from "react";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { Strategy as StrategyTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";
import { StrategyTemplate } from "@umerx/umerx-blackdog-configurator-types-typescript";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { useParams } from "react-router-dom";
import Toggle from "../components/Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { ToggleState } from "../Interfaces/settings";

interface StrategyDetailProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
	viewState: ViewState;
}

const statusStateDisplays = {
	[ToggleState.on]: (
		<FontAwesomeIcon
			icon={faCheck}
			className="text-sm transition-bg duration-1000"
		/>
	),
	[ToggleState.off]: (
		<FontAwesomeIcon
			icon={faTimes}
			className="text-sm transition-bg duration-1000"
		/>
	),
};

const StrategyDetail: React.FC<StrategyDetailProps> = ({
	blackdogConfiguratorClient,
	viewState = ViewState.read,
}) => {
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	useEffect(() => {
		setBreadcrumbs([
			{
				label: "Home",
				path: "/",
			},
			{
				label: "Strategies",
				path: "/Strategy",
			},
		]);
	}, [setBreadcrumbs]);

	const [statusState, setStatusState] = useState<ToggleState>(
		ToggleState.off
	);
	const toggleStatusState = (newState: ToggleState) => {
		setStatusState(newState);
	};

	const [strategy, setStrategy] =
		useState<StrategyTypes.StrategyGetResponseBodyDataInstance | null>(
			null
		);

	const { strategyId } = useParams();

	const templates: StrategyTemplate.StrategyTemplateName[] = [
		"SeaDogDiscountScheme",
	];

	useEffect(() => {
		blackdogConfiguratorClient
			.strategyTemplateSeaDogDiscountScheme()
			.getMany({});
		if (strategyId) {
			blackdogConfiguratorClient
				.strategy()
				.getSingle({
					id: parseInt(strategyId, 10),
				})
				.then((response) => {
					setStrategy(response);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [blackdogConfiguratorClient]);

	return (
		<div>
			<dl>
				<dt>Title</dt>
				<dd>
					<input type="text" defaultValue={strategy?.title} />
				</dd>

				<dt>Template</dt>
				<dd>
					<select defaultValue={strategy?.strategyTemplateName}>
						{templates.map((template) => (
							<option key={template} value={template}>
								{template}
							</option>
						))}
					</select>
				</dd>

				<div className="mb-4 w-full">
					<div className="p-2 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
						<Toggle
							toggleState={statusState}
							display={statusStateDisplays[statusState]}
							labelText="Active?"
							onToggle={toggleStatusState}
						/>
					</div>
				</div>
			</dl>
		</div>
	);
};

export default StrategyDetail;
