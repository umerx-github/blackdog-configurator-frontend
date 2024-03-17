import React, { ReactNode } from "react";
import { ToggleState } from "../interfaces/settings";

interface ToggleProps {
	toggleState: ToggleState;
	display?: ReactNode;
	labelText?: ReactNode;
	error?: string;
	onToggle: (newState: ToggleState) => void;
	onChange?: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
	toggleState,
	display,
	labelText,
	error,
	onToggle,
	onChange,
}) => {
	const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const newState =
			toggleState === ToggleState.on ? ToggleState.off : ToggleState.on;
		onToggle(newState);
		onChange?.(newState === ToggleState.on ? true : false);
	};

	return (
		<>
			{error ? <p>{error}</p> : null}
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
					onClick={(e: React.MouseEvent<HTMLDivElement>) => {
						handleToggle(e);
					}}
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
		</>
	);
};

export default Toggle;
