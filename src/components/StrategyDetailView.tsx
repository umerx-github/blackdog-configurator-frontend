import React, { useRef, useState } from "react";
import { ViewState } from "../interfaces/viewState";
import {
	Strategy as StrategyTypes,
	StrategyTemplate as StrategyTemplateTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons/faRectangleList";
import { faObjectUngroup } from "@fortawesome/free-solid-svg-icons/faObjectUngroup";
import MediumButton from "./buttons/MediumButton";
import BrushChart from "./charts/BrushChart";
import StrategyDetailForm from "./StrategyDetailForm";
import { StrategyDetailFormModel } from "../interfaces/strategyDetail";
import FixedButtonLink from "./buttons/FixedButtonLink";
interface StrategyDetailViewProps {
	viewState: ViewState;
	model: StrategyDetailFormModel;
	onChange?: (model: StrategyDetailFormModel) => void;
	onSubmit?: (model: StrategyDetailFormModel) => void;
	actionIcon?: IconDefinition | null;
	actionUrl?: string | null;
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
	brushChartMin?: number;
	brushChartMax?: number;
}

const StrategyDetailView: React.FC<StrategyDetailViewProps> = ({
	viewState,
	model,
	onChange = () => {},
	onSubmit = () => {},
	actionIcon = null,
	actionUrl = null,
	series = [],
	brushChartMin,
	brushChartMax,
}) => {
	return (
		<>
			<StrategyDetailForm
				viewState={viewState}
				model={model}
				onSubmit={onSubmit}
				onChange={onChange}
			></StrategyDetailForm>
			{viewState === ViewState.view ? (
				<>
					<div className="flex gap-4 mt-4">
						<BrushChart
							series={series}
							brushChartMin={brushChartMin}
							brushChartMax={brushChartMax}
						></BrushChart>
					</div>
					<div className="flex gap-4 mt-4">
						<Link to="strategyTemplate" className="w-6/12 max-w-60">
							<MediumButton
								icon={faObjectUngroup}
								text="Templates"
							/>
						</Link>
						<Link to="strategyLogs" className="w-6/12 max-w-60">
							<MediumButton icon={faRectangleList} text="Logs" />
						</Link>
					</div>
				</>
			) : null}
			{actionIcon && actionUrl ? (
				<FixedButtonLink icon={actionIcon} to={actionUrl} />
			) : null}
		</>
	);
};

export default StrategyDetailView;
