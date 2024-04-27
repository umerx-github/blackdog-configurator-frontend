import { useContext, useEffect, useState } from "react";
import BreadcrumbsContext from "../components/breadcrumbs/BreadcrumbsContext";
import { useParams } from "react-router-dom";
import { Client as BlackdogConfiguratorClient } from "@umerx/umerx-blackdog-configurator-client-typescript";
import {
	Strategy as StrategyTypes,
	StrategyLog as StrategyLogTypes,
} from "@umerx/umerx-blackdog-configurator-types-typescript";
import { AxiosError } from "axios";
import RadioInputGroup from "../components/RadioInputGroup";
import LogDate from "../components/logging/LogDate";
import LogLevel from "../components/logging/LogLevel";
import CopyButton from "../components/buttons/CopyButton";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import PageSizePicker from "../components/RowsPerPagePicker";
import PageNumberNavigator from "../components/PageNumberNavigator";

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
	const [openStatus, setOpenStatus] = useState<Record<number, boolean>>({});
	const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(50);
	const [totalPages, setTotalPages] = useState<number>(1);

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
							"🐾 Oh no, we've fetched far and wide but couldn't dig up the strategy logs you're looking for. Please try again later or check if you've got the right strategy ID. 🐾"
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
					const { data: logsFetched, totalPages } =
						await blackdogConfiguratorClient.strategyLog().getMany({
							strategyIds: [strategyId],
							pageSize: pageSize,
							pageNumber: currentPageNumber,
						});
					setLogs(logsFetched);
					setTotalPages(totalPages);
				} catch (e) {
					if (e instanceof AxiosError && e.response?.status === 404) {
						setStatusError(
							"🐾 Oh no, we've fetched far and wide but couldn't dig up the strategy logs you're looking for. Please try again later or check if you've got the right strategy ID. 🐾"
						);
					} else {
						setGeneralError(
							`🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`
						);
					}
				}
			}
		})();
	}, [strategyId, pageSize, currentPageNumber]);

	useEffect(() => {
		setCurrentPageNumber(1);
	}, [pageSize]);

	if (statusError) {
		return <>{statusError}</>;
	}

	return (
		<>
			<div className="max-w-md mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-4 mb-4">
				<h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
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
							<div className="border border-zinc-200 dark:border-zinc-700 overflow-hidden border-b">
								<table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
									<thead className="bg-zinc-50 dark:bg-zinc-800 transition-bg duration-1000">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
											>
												Timestamp
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
											>
												Level
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
											>
												Message
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
											>
												Raw Data
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
											></th>
										</tr>
									</thead>
									<tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 transition-bg duration-1000">
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
													<div className="text-sm text-zinc-900 dark:text-white">
														<LogLevel
															level={log.level}
														/>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="flex">
														<div className="text-sm text-zinc-900 dark:text-white max-2-lines">
															{log.message}
														</div>
													</div>
												</td>
												<td className="px-6 py-4 text-sm text-zinc-900 dark:text-white">
													<div className="flex">
														<div className="max-2-lines">
															{JSON.stringify(
																log?.data
																	?.rawData
															)}
														</div>
													</div>
												</td>
												<td>
													<button
														onClick={() =>
															setOpenStatus({
																...openStatus,
																[log.id]:
																	!openStatus[
																		log.id
																	],
															})
														}
														className="text-xl text-zinc-500 dark:text-zinc-400"
													>
														<FontAwesomeIcon
															icon={
																faEllipsisVertical
															}
														/>
													</button>
												</td>
												<td>
													<Modal
														isOpen={
															openStatus[
																log.id
															] ?? false
														}
														onClose={() => {
															setOpenStatus({
																...openStatus,
																[log.id]: false,
															});
														}}
													>
														<div className="flex justify-between items-start">
															<h2 className="font-semibold text-zinc-900 dark:text-white mb-4">
																Log Details
															</h2>
															<CopyButton
																text={JSON.stringify(
																	log
																)}
															/>
														</div>
														<pre
															className="text-wrap overflow-scroll text-xs"
															style={{
																maxHeight:
																	"60vh",
															}}
														>
															{JSON.stringify(
																log
															)}
														</pre>
													</Modal>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="flex justify-between">
								<PageSizePicker
									pageSize={pageSize}
									setPageSize={setPageSize}
								/>
								<PageNumberNavigator
									currentPageNumber={currentPageNumber}
									setCurrentPageNumber={setCurrentPageNumber}
									totalPages={totalPages}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StrategyLog;
