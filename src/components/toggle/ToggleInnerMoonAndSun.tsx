import React from "react";

import { ToggleState } from "../../interfaces/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";

interface ToggleInnerMoonAndSunProps {
	toggleState: ToggleState;
}

const ToggleInnerMoonAndSun: React.FC<ToggleInnerMoonAndSunProps> = ({
	toggleState,
}) => {
	if (toggleState === ToggleState.on) {
		return (
			<FontAwesomeIcon
				icon={faMoon}
				className="dark:text-zinc-200 transition-bg duration-1000"
			/>
		);
	}
	return (
		<FontAwesomeIcon
			icon={faSun}
			className="text-zinc-700 transition-bg duration-1000"
		/>
	);
};

export default ToggleInnerMoonAndSun;
