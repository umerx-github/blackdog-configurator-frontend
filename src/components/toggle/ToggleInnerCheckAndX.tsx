import React from "react";
import { ToggleState } from "../../interfaces/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

interface ToggleInnerCheckAndXProps {
	toggleState: ToggleState;
}

const ToggleInnerCheckAndX: React.FC<ToggleInnerCheckAndXProps> = ({
	toggleState,
}) => {
	if (toggleState === ToggleState.on) {
		return (
			<FontAwesomeIcon
				icon={faCheck}
				className="text-sm transition-bg duration-1000"
			/>
		);
	}
	return (
		<FontAwesomeIcon
			icon={faTimes}
			className="text-sm transition-bg duration-1000"
		/>
	);
};

export default ToggleInnerCheckAndX;
