import React, { ReactNode } from "react";
import { ToggleState } from "../Interfaces/settings";

interface ToggleProps {
	toggleState: ToggleState;
	display?: ReactNode;
	labelText?: ReactNode;
	onToggle: (newState: ToggleState) => void;
}

const Toggle: React.FC<ToggleProps> = ({
	toggleState,
	display,
	labelText,
	onToggle,
}) => {
	const handleToggle = () => {
		const newState =
			toggleState === ToggleState.on ? ToggleState.off : ToggleState.on;
		onToggle(newState);
	};

	return (
		<div>
			<div className="relative cursor-pointer">
				<div
					onClick={handleToggle}
					className="w-14 h-7 bg-zinc-200 inline-flex items-center px-0.5"
				>
					<button
						className={`${
							toggleState === "ON" ? "toggle-transform" : ""
						} w-6 h-6 bg-zinc-600 text-sm font-medium flex justify-center items-center transition-all`}
					>
						{display}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Toggle;
