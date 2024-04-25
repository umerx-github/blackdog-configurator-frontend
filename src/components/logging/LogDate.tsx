interface LogDateProps {
	timestamp: number;
	timezone: string;
}

const LogDate: React.FC<LogDateProps> = ({ timestamp, timezone }) => {
	switch (timezone) {
		case "localTime":
			return (
				<>
					<div className="text-sm text-zinc-900 dark:text-white">
						{new Date(timestamp).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
						<br />
						{new Date(timestamp).toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							timeZoneName: "short",
						})}
					</div>
				</>
			);
		case "utc":
			return (
				<>
					<div className="text-sm text-zinc-900 dark:text-white">
						{new Date(timestamp).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
							timeZone: "UTC",
						})}
						<br />
						{new Date(timestamp).toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							timeZone: "UTC",
							timeZoneName: "short",
						})}
					</div>
				</>
			);
		case "both":
			return (
				<>
					<div className="text-sm text-zinc-900 dark:text-white">
						{new Date(timestamp).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
						<span>, </span>
						{new Date(timestamp).toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							timeZoneName: "short",
						})}
					</div>
					<div className="text-sm text-zinc-500 dark:text-zinc-400">
						{new Date(timestamp).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
							timeZone: "UTC",
						})}
						<span>, </span>
						{new Date(timestamp).toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							second: "2-digit",
							timeZone: "UTC",
							timeZoneName: "short",
						})}
					</div>
				</>
			);
		default:
			return <>Default</>;
	}
};

export default LogDate;
