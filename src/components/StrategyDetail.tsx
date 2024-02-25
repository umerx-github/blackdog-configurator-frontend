import { ViewState } from "../Interfaces/viewState";

interface StrategyDetailProps {
	viewState: ViewState;
}

const StrategyDetail: React.FC<StrategyDetailProps> = (viewState) => {
	return (
		<div>
			<h1>Hello from StrategyDetail</h1>
		</div>
	);
};

export default StrategyDetail;
