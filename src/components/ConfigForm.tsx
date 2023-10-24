import { useEffect, useState } from "react";
import APIInstance, { API } from "../lib/backend/api";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
	useParams,
} from "react-router-dom";
import {
	ConfigInterface,
	ConfigSymbolInterface,
	NewConfigRequestInterface,
	NewConfigSymbolInterface,
	SymbolInterface,
	UpdateConfigRequestInterface,
} from "../interfaces/lib/backend/api/common";
import FloatInput from "./inputs/FloatInput";
import DragAndDropRepeaterInput from "./inputs/drag-and-drop/DragAndDropRepeaterInput";
import { SubmitTarget } from "react-router-dom/dist/dom";
import { APIInterface } from "../interfaces/lib/backend/api";

interface ConfigSymbolWithNameInterface extends NewConfigSymbolInterface {
	name: string;
}

const sortSymbols = function (symbols: ConfigSymbolInterface[]) {
	return [...symbols].sort((a, b) => {
		return a.order - b.order;
	});
};

export const loader: LoaderFunction = async ({ params }) => {
	if (undefined === params.id) {
		throw new Response("Not Found", { status: 404 });
	}
	const id = parseInt(params.id);
	if (isNaN(id)) {
		throw new Response("Not Found", { status: 404 });
	}
	const config = await APIInstance.getConfigEndpoint().getById(id);
	return config;
};

export const action: ActionFunction = async ({ params, request }) => {
	if (undefined === params.id) {
		throw new Response("Not Found", { status: 404 });
	}
	const id = parseInt(params.id);
	if (isNaN(id)) {
		throw new Response("Not Found", { status: 404 });
	}
	const newConfig = (await request.json()) as UpdateConfigRequestInterface;
	// Make this the new active config
	newConfig.isActive = true;
	const body = await APIInstance.getConfigEndpoint().patchById(id, newConfig);
	return body;
};

export const newConfigToSubmitTarget = function (
	newConfig: UpdateConfigRequestInterface
): SubmitTarget {
	return JSON.parse(JSON.stringify(newConfig));
};

const promiseOptions = async (
	inputValue: string
): Promise<SymbolInterface[]> => {
	let selectedSymbols = await APIInstance.getSymbolEndpoint().get();
	if (inputValue) {
		selectedSymbols = selectedSymbols.filter((symbol) => {
			return symbol.name.toUpperCase().includes(inputValue.toUpperCase());
		});
	}
	return selectedSymbols;
};

const onCreateSymbol = async (
	name: string,
	configId: number,
	totalKnownSymbols: SymbolInterface[],
	setTotalKnownSymbols: React.Dispatch<
		React.SetStateAction<SymbolInterface[]>
	>,
	selectedSymbols: ConfigSymbolWithNameInterface[],
	setSelectedSymbols: React.Dispatch<
		React.SetStateAction<ConfigSymbolWithNameInterface[]>
	>,
	APIInstance: APIInterface
) => {
	const order = totalKnownSymbols.length;
	let newSymbol: SymbolInterface | null = null;
	try {
		newSymbol = await APIInstance.getSymbolEndpoint().post({
			name,
		});
	} catch (e) {
		try {
			newSymbol = await APIInstance.getSymbolEndpoint().getByName(name);
		} catch (e) {
			throw e;
		}
	}
	if (null === newSymbol) {
		throw Error(`Unable to create symbol with name: ${name}`);
	}
	setTotalKnownSymbols([...totalKnownSymbols, newSymbol]);
	setSelectedSymbols([
		...selectedSymbols,
		{
			name: newSymbol.name,
			order,
			configId,
			symbolId: newSymbol.id,
		},
	]);
};

const loadTotalKnownSymbols = async (
	setTotalKnownSymbols: React.Dispatch<
		React.SetStateAction<SymbolInterface[]>
	>,
	APIInstance: APIInterface
) => {
	const symbols = await APIInstance.getSymbolEndpoint().get();
	setTotalKnownSymbols(symbols);
};

const filterTotalAvailableSymbols = (
	totalAvailableSymbols: SymbolInterface[],
	inputValue: string
) => {
	if (inputValue) {
		totalAvailableSymbols = totalAvailableSymbols.filter((symbol) => {
			return symbol.name.toUpperCase().includes(inputValue.toUpperCase());
		});
	}
	return totalAvailableSymbols;
};

export default function ConfigForm() {
	const submit = useSubmit();
	const data = useLoaderData() as ConfigInterface;
	const { id } = useParams();
	if (undefined === id) {
		throw new Error(`Config ID is undefined`);
	}
	const configId = parseInt(id);
	const [totalKnownSymbols, setTotalKnownSymbols] = useState<
		SymbolInterface[]
	>([]);
	const [selectedSymbols, setSelectedSymbols] = useState<
		ConfigSymbolWithNameInterface[]
	>([]);
	const [availableSymbolOptions, setAvailableSymbolOptions] = useState<
		SymbolInterface[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [cashInDollars, setCashInDollars] = useState<string>(
		data.cashInDollars?.toString() ?? ""
	);
	const [sellAtPercentile, setSellAtPercentile] = useState<string>(
		data.sellAtPercentile?.toString() ?? ""
	);
	const [buyAtPercentile, setBuyAtPercentile] = useState<string>(
		data.buyAtPercentile?.toString() ?? ""
	);
	const [sellTrailingPercent, setSellTrailingPercent] = useState<string>(
		data.sellTrailingPercent?.toString() ?? ""
	);
	const [buyTrailingPercent, setBuyTrailingPercent] = useState<string>(
		data.buyTrailingPercent?.toString() ?? ""
	);
	const [minimumGainPercent, setMinimumGainPercent] = useState<string>(
		data.minimumGainPercent?.toString() ?? ""
	);
	const [timeframeInDays, setTimeframeInDays] = useState<string>(
		data.timeframeInDays?.toString() ?? ""
	);
	// Query to load totalKnownSymbols only 1x
	useEffect(() => {
		loadTotalKnownSymbols(setTotalKnownSymbols, APIInstance);
	}, []);
	// Query to load inital config
	useEffect(() => {
		(async () => {
			setCashInDollars(data.cashInDollars?.toString() ?? "");
			setSellAtPercentile(data.sellAtPercentile?.toString() ?? "");
			setBuyAtPercentile(data.buyAtPercentile?.toString() ?? "");
			setSellTrailingPercent(data.sellTrailingPercent?.toString() ?? "");
			setBuyTrailingPercent(data.buyTrailingPercent?.toString() ?? "");
			setMinimumGainPercent(data.minimumGainPercent?.toString() ?? "");
			setTimeframeInDays(data.timeframeInDays?.toString() ?? "");
		})();
	}, [data]);
	// Query to load selectedSymbols
	useEffect(() => {
		let validConfigSymbols = data.configSymbols.filter((configSymbol) => {
			return totalKnownSymbols.findIndex((symbol) => {
				return symbol.id === configSymbol.symbolId;
			});
		});
		validConfigSymbols = sortSymbols(validConfigSymbols);
		const configSymbolsWithName: ConfigSymbolWithNameInterface[] =
			validConfigSymbols.map((configSymbol) => {
				const symbolIndex = totalKnownSymbols.findIndex((symbol) => {
					return symbol.id === configSymbol.symbolId;
				});
				const symbol = totalKnownSymbols[symbolIndex];
				const configSymbolWithName: ConfigSymbolWithNameInterface = {
					configId: configSymbol.configId,
					symbolId: configSymbol.symbolId,
					order: configSymbol.order,
					name: symbol.name,
				};
				return configSymbolWithName;
			});
		// set selected symbols
		setSelectedSymbols(configSymbolsWithName);
	}, [data, totalKnownSymbols]);
	// Query to load availableSymbolOptions
	// useEffect(() => {
	// 	(async () => {
	// 		setIsLoading(true);
	// 		const fetchSymbolOptions = await promiseOptions("");
	// 		// Filter out fetchSymbolOptions that are already in
	// 		const filteredOptions = fetchSymbolOptions.filter((option) => {
	// 			return (
	// 				selectedSymbols.findIndex(
	// 					(symbol) =>
	// 						symbol.symbolId.toString() === option.id.toString()
	// 				) === -1
	// 			);
	// 		});
	// 		console.log({
	// 			availableSymbolOptions,
	// 			selectedSymbols,
	// 			fetchSymbolOptions,
	// 			filteredOptions,
	// 		});
	// 		setAvailableSymbolOptions(filteredOptions);
	// 		setIsLoading(false);
	// 	})();
	// }, [selectedSymbols]);
	// Set Available Symbol Options
	useEffect(() => {
		setIsLoading(true);
		setAvailableSymbolOptions(
			totalKnownSymbols.filter((knownSymbol) => {
				return (
					-1 ===
					selectedSymbols.findIndex(
						(selectedSymbol) =>
							selectedSymbol.symbolId === knownSymbol.id
					)
				);
			})
		);
		setIsLoading(false);
	}, [totalKnownSymbols, selectedSymbols]);
	console.log({ availableSymbolOptions });
	return (
		// You have to make sure your Form has defined the `method` and `action` props and that your invokation of submit() uses the same values for `method` and `action` in the SubmitOptions
		<Form
			method="post"
			action={`${configId}`}
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const newConfig: UpdateConfigRequestInterface = {
					isActive: true,
					configSymbols: selectedSymbols,
					cashInDollars: Number(
						formData.get("cashInDollars")?.toString() ?? ""
					),
					sellAtPercentile: Number(
						formData.get("sellAtPercentile")?.toString() ?? ""
					),
					buyAtPercentile: Number(
						formData.get("buyAtPercentile")?.toString() ?? ""
					),
					sellTrailingPercent: Number(
						formData.get("sellTrailingPercent")?.toString() ?? ""
					),
					buyTrailingPercent: Number(
						formData.get("buyTrailingPercent")?.toString() ?? ""
					),
					minimumGainPercent: Number(
						formData.get("minimumGainPercent")?.toString() ?? ""
					),
					timeframeInDays: Number(
						formData.get("timeframeInDays")?.toString() ?? ""
					),
					alpacaApiKey:
						formData.get("alpacaApiKey")?.toString() ?? "",
					alpacaApiSecret:
						formData.get("alpacaApiSecret")?.toString() ?? "",
				};
				submit(newConfigToSubmitTarget(newConfig), {
					method: "post",
					action: ``,
					encType: "application/json",
				});
			}}
		>
			<label htmlFor="cashInDollars">CashInDollars</label>
			<FloatInput
				name="cashInDollars"
				value={cashInDollars}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setCashInDollars(value);
				}}
			/>
			<label htmlFor="sellAtPercentile">Sell At Percentile</label>
			<FloatInput
				name="sellAtPercentile"
				value={sellAtPercentile}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setSellAtPercentile(value);
				}}
			/>
			<label htmlFor="buyAtPercentile">Buy At Percentile</label>
			<FloatInput
				name="buyAtPercentile"
				value={buyAtPercentile}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setBuyAtPercentile(value);
				}}
			/>
			<label htmlFor="sellTrailingPercent">Sell Trailing Percent</label>
			<FloatInput
				name="sellTrailingPercent"
				value={sellTrailingPercent}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setSellTrailingPercent(value);
				}}
			/>
			<label htmlFor="buyTrailingPercent">Buy Trailing Percent</label>
			<FloatInput
				name="buyTrailingPercent"
				value={buyTrailingPercent}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setBuyTrailingPercent(value);
				}}
			/>
			<label htmlFor="minimumGainPercent">Minimum Gain Percent</label>
			<FloatInput
				name="minimumGainPercent"
				value={minimumGainPercent}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setBuyTrailingPercent(value);
				}}
			/>
			<label htmlFor="timeframeInDays">Timeframe In Days</label>
			<FloatInput
				name="timeframeInDays"
				value={timeframeInDays}
				title="Enter a valid number with up to 2 decimal places."
				onChange={(value) => {
					setTimeframeInDays(value);
				}}
			/>
			<label htmlFor="alpacaApiKey">Alpaca Api Key</label>
			<input
				type="text"
				name="alpacaApiKey"
				defaultValue={data.alpacaApiKey ?? ""}
			/>
			<label htmlFor="alpacaApiSecret">Alpaca Api Secret</label>
			<input
				type="password"
				name="alpacaApiSecret"
				defaultValue={data.alpacaApiSecret ?? ""}
			/>
			<DragAndDropRepeaterInput
				droppableId="selectedSymbols"
				selectedItems={selectedSymbols.map((symbol) => {
					return {
						itemId: symbol.symbolId.toString(),
						itemValue: symbol.name,
					};
				})}
				availableItems={availableSymbolOptions.map((option) => {
					return {
						itemId: option.id.toString(),
						itemValue: option.name,
					};
				})}
				isLoading={isLoading}
				onReorder={(items) => {
					const selectedSymbolsReordered: ConfigSymbolWithNameInterface[] =
						[];
					items.forEach((item) => {
						const symbolIndex = selectedSymbols.findIndex(
							(symbol) =>
								symbol.symbolId.toString() === item.itemId
						);
						if (symbolIndex !== -1) {
							selectedSymbolsReordered.push(
								selectedSymbols[symbolIndex]
							);
						}
					});
					const newSelectedSymbols = selectedSymbolsReordered.map(
						(symbol, index) => {
							return {
								...symbol,
								configId,
								symbolId: symbol.symbolId,
								order: index,
							};
						}
					);
					setSelectedSymbols(newSelectedSymbols);
				}}
				onAdd={(item) => {
					const optionIndex = availableSymbolOptions.findIndex(
						(option) => option.id.toString() === item.itemId
					);
					const option = availableSymbolOptions[optionIndex];
					const newOptions = [...availableSymbolOptions];
					newOptions.splice(optionIndex, 1);
					setAvailableSymbolOptions(newOptions);
					const newSelectedSymbols: ConfigSymbolWithNameInterface[] =
						[
							...selectedSymbols,
							{
								...option,
								configId,
								symbolId: option.id,
								order: selectedSymbols.length,
							},
						];
					setSelectedSymbols(newSelectedSymbols);
				}}
				onDelete={(item) => {
					/*
					const symbolIndex = selectedSymbols.findIndex(
						(symbol) => symbol.symbolId.toString() === item.itemId
					);
					const symbol = selectedSymbols[symbolIndex];
					const newSymbols = [...selectedSymbols];
					newSymbols.splice(symbolIndex, 1);
					const newSelectedSymbols = newSymbols.map(
						(symbol, index) => {
							return {
								...symbol,
								order: index,
							};
						}
					);
					setSelectedSymbols(newSelectedSymbols);
					const newOptions: SymbolInterface = [
						...availableSymbolOptions,
						symbol,
					];
					console.log({ newOptions });
					setAvailableSymbolOptions(newOptions);
					*/
				}}
				onCreate={(inputValue) => {
					(async () => {
						setIsLoading(true);
						await onCreateSymbol(
							inputValue,
							configId,
							totalKnownSymbols,
							setTotalKnownSymbols,
							selectedSymbols,
							setSelectedSymbols,
							APIInstance
						);
						setIsLoading(false);
					})();
				}}
			></DragAndDropRepeaterInput>
			<button type="submit">Submit</button>
		</Form>
	);
}
