import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";

const BlackDogHeader: React.FC = () => {
	return (
		<div className="blackdog-header">
			<div className="flex justify-between">
				<h3 className="text-2xl orbitron">
					<span className="font-black">
						BL
						<FontAwesomeIcon icon={faDog} className="logo-dog" />
						CK
					</span>
					<span className="font-normal">DOG</span>
				</h3>
			</div>
		</div>
	);
};

export default BlackDogHeader;
