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
import MediumButton from "./MediumButton";
import BrushChart from "./charts/BrushChart";
import StrategyDetailForm from "./StrategyDetailForm";
interface StrategyDetailViewProps {
	viewState?: ViewState;
	generalError?: string | null;
	status?: StrategyTypes.Status;
	statusError?: string | null;
	title?: string | null;
	setTitle?: (title: string) => void;
	titleError?: string | null;
	strategyTemplateName?: StrategyTemplateTypes.StrategyTemplateName | null;
	strategyTemplateNameError?: string | null;
	cashInCents?: number | null;
	cashInCentsError?: string | null;
	onSubmit?: (data: {
		status: string | null;
		title: string | null;
		strategyTemplateName: string | null;
		cashInCents: number | null;
	}) => void;
	actionIcon?: IconDefinition | null;
	actionUrl?: string | null;
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
	brushChartMin?: number;
	brushChartMax?: number;
}

const StrategyDetailView: React.FC<StrategyDetailViewProps> = ({
	viewState = ViewState.view,
	generalError = null,
	status = "active",
	statusError = null,
	title = null,
	setTitle = () => {},
	titleError = null,
	strategyTemplateName = null,
	strategyTemplateNameError = null,
	cashInCents = null,
	cashInCentsError = null,
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
				generalError={generalError}
				status={status}
				statusError={statusError}
				title={title}
				setTitle={setTitle}
				titleError={titleError}
				strategyTemplateName={strategyTemplateName}
				strategyTemplateNameError={strategyTemplateNameError}
				cashInCents={cashInCents}
				cashInCentsError={cashInCentsError}
				onSubmit={onSubmit}
				actionIcon={actionIcon}
				actionUrl={actionUrl}
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
				<div className="absolute bottom-4 right-4">
					<Link to={actionUrl}>
						<FontAwesomeIcon
							icon={actionIcon}
							className="text-4xl text-zinc-600 dark:text-zinc-400 transition-bg duration-1000"
						/>
					</Link>
				</div>
			) : null}
		</>
	);
};

export default StrategyDetailView;
