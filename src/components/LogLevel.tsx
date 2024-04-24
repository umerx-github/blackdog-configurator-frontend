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
	const iconColor = () => {
		switch (level) {
			case "emergency":
			case "alert":
			case "critical":
			case "error":
				return "text-gray-900 dark:text-white";
			case "warning":
			case "notice":
			case "info":
			case "debug":
				return "text-gray-500 dark:text-gray-400";
			default:
				return "text-gray-900 dark:text-white";
		}
	};

	const iconClass = () => {
		switch (level) {
			case "emergency":
				return (
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className={iconColor()}
					/>
				);
			case "alert":
				return (
					<FontAwesomeIcon icon={faBell} className={iconColor()} />
				);
			case "critical":
				return (
					<FontAwesomeIcon
						icon={faHeartbeat}
						className={iconColor()}
					/>
				);
			case "error":
				return (
					<FontAwesomeIcon
						icon={faTimesCircle}
						className={iconColor()}
					/>
				);
			case "warning":
				return (
					<FontAwesomeIcon
						icon={faExclamationCircle}
						className={iconColor()}
					/>
				);
			case "notice":
				return (
					<FontAwesomeIcon
						icon={faInfoCircle}
						className={iconColor()}
					/>
				);
			case "info":
				return (
					<FontAwesomeIcon icon={faInfo} className={iconColor()} />
				);
			case "debug":
				return <FontAwesomeIcon icon={faBug} className={iconColor()} />;
			default:
				return (
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className={iconColor()}
					/>
				);
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
