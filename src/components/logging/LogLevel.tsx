import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBell,
	faBug,
	faExclamationCircle,
	faExclamationTriangle,
	faHeartbeat,
	faInfo,
	faInfoCircle,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Log as LogTypes } from "@umerx/umerx-blackdog-configurator-types-typescript";

interface LogLevelProps {
	level: LogTypes.LogLevel;
}

const LogLevel: React.FC<LogLevelProps> = ({ level }) => {
	const iconClass = () => {
		switch (level) {
			case "emergency":
				return <FontAwesomeIcon icon={faExclamationTriangle} />;
			case "alert":
				return <FontAwesomeIcon icon={faBell} />;
			case "critical":
				return <FontAwesomeIcon icon={faHeartbeat} />;
			case "error":
				return <FontAwesomeIcon icon={faTimesCircle} />;
			case "warning":
				return <FontAwesomeIcon icon={faExclamationCircle} />;
			case "notice":
				return <FontAwesomeIcon icon={faInfoCircle} />;
			case "info":
				return <FontAwesomeIcon icon={faInfo} />;
			case "debug":
				return <FontAwesomeIcon icon={faBug} />;
			default:
				return <FontAwesomeIcon icon={faExclamationTriangle} />;
		}
	};

	return (
		<div className="flex flex-col items-center">
			<div className="text-xl">{iconClass()}</div>
			<div className="text-xs">{level}</div>
		</div>
	);
};

export default LogLevel;
