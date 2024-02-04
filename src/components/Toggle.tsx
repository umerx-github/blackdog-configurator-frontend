import React, { ReactNode } from "react";
import { ToggleState } from "../Interfaces/settings";

interface ToggleProps {
	toggleState: ToggleState;
	display?: ReactNode;
	labelText?: ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ toggleState, display, labelText }) => {
	return (
		<div>
			<label className="relative inline-flex items-center cursor-pointer">
				<input type="checkbox" value="" className="sr-only peer" />
				<div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-zinc-300 dark:peer-focus:ring-zinc-800 peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-zinc-600"></div>
				{labelText ? (
					<span className="ms-3 text-sm font-medium">
						{labelText}
					</span>
				) : null}
			</label>
			<br></br>
			<div className="relative cursor-pointer">
				<div className="w-14 h-7 bg-zinc-200 inline-flex items-center px-0.5">
					<button className="w-6 h-6 bg-zinc-600 text-sm font-medium flex justify-center items-center">
						{display}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Toggle;
