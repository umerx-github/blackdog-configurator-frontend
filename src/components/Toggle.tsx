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
					className="w-16 bg-zinc-300 dark:bg-zinc-600 inline-flex items-center p-1"
				>
					<button
						className={`${
							toggleState === "ON" ? "toggle-transform" : ""
						} w-6 h-6 bg-zinc-600 dark:bg-zinc-300 text-sm font-medium flex justify-center items-center transition-all duration-1000`}
					>
						{display}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Toggle;
