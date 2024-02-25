import { ViewState } from "../Interfaces/viewState";
import React, { useEffect, useContext } from "react";
import BreadcrumbsContext from "../components/BreadcrumbsContext";

interface StrategyDetailProps {
	viewState: ViewState;
}

const StrategyDetail: React.FC<StrategyDetailProps> = (viewState) => {
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

	return (
		<div>
			<h1>Hello from StrategyDetail</h1>
		</div>
	);
};

export default StrategyDetail;
