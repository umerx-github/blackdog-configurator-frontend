import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface FixedButtonLinkProps {
	icon: IconProp;
	to: string;
}

const FixedButtonLink: React.FC<FixedButtonLinkProps> = ({ icon, to }) => {
	return (
		<>
			<div className="h-12"></div>
			<div className="fixed bottom-4 right-4">
				<Link to={to}>
					<FontAwesomeIcon
						icon={icon}
						className="text-4xl text-zinc-600 dark:text-zinc-400 transition-bg duration-1000"
					/>
				</Link>
			</div>
		</>
	);
};

export default FixedButtonLink;
