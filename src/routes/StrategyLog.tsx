import { useContext, useEffect, useState } from "react";
import BreadcrumbsContext from "../components/BreadcrumbsContext";
import { useParams } from "react-router-dom";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import {
	Strategy as StrategyTypes,
	StrategyLog as StrategyLogTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { AxiosError } from "axios";
import RadioInputGroup from "../components/RadioInputGroup";
import LogDate from "../components/LogDate";

interface StrategyLogProps {
	blackdogConfiguratorClient: BlackdogConfiguratorClient.Client;
}

const StrategyLog: React.FC<StrategyLogProps> = ({
	blackdogConfiguratorClient,
}) => {
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);
	const params = useParams();
	const strategyId = params.strategyId ? parseInt(params.strategyId) : null;
	const [strategy, setStrategy] =
		useState<StrategyTypes.StrategyResponseBodyDataInstance | null>(null);
	const [generalError, setGeneralError] = useState<string | null>(null);
	const [statusError, setStatusError] = useState<string | null>(null);
	const [logs, setLogs] = useState<
		StrategyLogTypes.StrategyLogResponseBodyDataInstance[]
	>([]);
	const [timezone, setTimezone] = useState<string>("localTime");

	useEffect(() => {
		if (!strategy) {
			return;
		}
		setBreadcrumbs([
			{
				label: "Home",
				path: "",
			},
			{
				label: "Strategies",
				path: "strategy",
			},
			{
				label: `${strategy?.title}`,
				path: `strategy/${strategy?.id}`,
			},
			{
				label: "Logs",
				path: `strategy/${strategy?.id}/logs`,
			},
		]);
	}, [strategy]);

	useEffect(() => {
		(async () => {
			if (null !== strategyId) {
				try {
					const { data: strategyFetched } =
						await blackdogConfiguratorClient
							.strategy()
							.getSingle({ id: strategyId });
					setStrategy(strategyFetched);
				} catch (e) {
					if (e instanceof AxiosError && e.response?.status === 404) {
						setStatusError(
							"🐾 Oh no, we've fetched far and wide but couldn't dig up the strategy logs you're looking for. It seems to have buried itself too well! Please try again later or check if you've got the right strategy ID. 🐾"
						);
					} else {
						setGeneralError(
							`🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`
						);
					}
				}
			}
		})();
	}, [strategyId]);

	useEffect(() => {
		(async () => {
			if (null !== strategyId) {
				try {
					const { data: logsFetched } =
						await blackdogConfiguratorClient
							.strategyLog()
							.getMany({ strategyIds: [strategyId] });
					setLogs(logsFetched);
				} catch (e) {
					if (e instanceof AxiosError && e.response?.status === 404) {
						setStatusError(
							"🐾 Oh no, we've fetched far and wide but couldn't dig up the strategy logs you're looking for. It seems to have buried itself too well! Please try again later or check if you've got the right strategy ID. 🐾"
						);
					} else {
						setGeneralError(
							`🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`
						);
					}
				}
			}
		})();
	}, [strategyId]);

	if (statusError) {
		return <>{statusError}</>;
	}

	return (
		<>
			<div className="max-w-md mx-auto bg-white border border-gray-200 p-4 mb-4">
				<h2 className="mb-4 text-lg font-semibold text-gray-900">
					Options
				</h2>
				<div className="flex items-center mb-4">
					<div className="flex flex-col gap-2">
						<span className="text-zinc-500 dark:text-zinc-400 text-sm">
							Timezone
						</span>
						<RadioInputGroup
							name="timezone"
							inputs={[
								{
									value: "localTime",
									label: "Local Time",
								},
								{ value: "utc", label: "UTC" },
								{ value: "both", label: "Both" },
							]}
							defaultValue={timezone}
							isEditable={true}
							onChange={(value) => {
								setTimezone(value);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="container mx-auto">
				<div className="flex flex-col">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Timestamp
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Level
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Message
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Raw Data
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{logs.map((log) => (
											<tr key={log.id}>
												<td className="px-6 py-4 whitespace-nowrap">
													<LogDate
														timestamp={
															log.timestamp
														}
														timezone={timezone}
													/>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900">
														{log.level}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900">
														{log.message}
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-gray-500">
													{JSON.stringify(
														log?.data?.rawData
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StrategyLog;
