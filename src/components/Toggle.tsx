import React, { ReactNode } from "react";
import { ToggleState } from "../interfaces/settings";

interface ToggleProps {
	toggleState: ToggleState;
	labelText?: ReactNode;
	error?: string;
	onChange: (newState: ToggleState) => void;
	isEditable?: boolean;
	children?: ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({
	toggleState,
	labelText,
	error,
	onChange,
	isEditable = true,
	children,
}) => {
	const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		const newState =
			toggleState === ToggleState.on ? ToggleState.off : ToggleState.on;
		onChange(newState);
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
						if (isEditable) {
							handleToggle(e);
						}
					}}
					className="w-16 bg-white dark:bg-zinc-700 inline-flex items-center p-1 h-8"
				>
					<button
						type="button"
						disabled={!isEditable}
						className={`${
							toggleState === ToggleState.on
								? "toggle-transform"
								: ""
						} w-6 h-6 bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm font-medium flex justify-center items-center transition-transform duration-1000`}
					>
						{children}
					</button>
				</div>
			</div>
		</>
	);
};

export default Toggle;
