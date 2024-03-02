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
		<div className="relative cursor-pointer flex justify-between">
			{labelText && (
				<label
					htmlFor="toggle"
					className="block flex items-center text-sm font-light font-medium text-zinc-900 dark:text-white max-width-75"
				>
					{labelText}
				</label>
			)}
			<div
				onClick={handleToggle}
				className="w-16 bg-white dark:bg-zinc-700 inline-flex items-center p-1 h-8"
			>
				<button
					className={`${
						toggleState === "ON" ? "toggle-transform" : ""
					} w-6 h-6 bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm font-medium flex justify-center items-center transition-transform duration-1000`}
				>
					{display}
				</button>
			</div>
		</div>
	);
};

export default Toggle;
