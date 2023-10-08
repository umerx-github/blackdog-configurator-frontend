import { useEffect, useState } from "react";
import APIInstance from "../lib/backend/api";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
} from "react-router-dom";
import {
	ConfigInterface,
	NewConfigInterface,
	SymbolInterface,
} from "../interfaces/lib/backend/api";
import FloatInput from "./inputs/FloatInput";
import DragAndDropRepeaterInput from "./inputs/drag-and-drop/DragAndDropRepeaterInput";
import { SubmitTarget } from "react-router-dom/dist/dom";

export const loader: LoaderFunction<ConfigInterface> = async () => {
	const config = await APIInstance.getConfigEndpoint().getActive();
	config.symbols = config.symbols.sort((a, b) => {
		return a.order - b.order;
	});
	return config;
};

export const action: ActionFunction = async ({ request }) => {
	const newConfig = (await request.json()) as NewConfigInterface;
	// Make this the new active config
	newConfig.isActive = true;
	const body = await APIInstance.getConfigEndpoint().post(newConfig);
	return body;
};

export const newConfigToSubmitTarget = function (
	newConfig: NewConfigInterface
): SubmitTarget {
	return {
		symbols: newConfig.symbols
			? newConfig.symbols.map((symbol) => {
					return {
						name: symbol.name,
						id: symbol.id,
					};
			  })
			: [],
		sellAtPercentile: newConfig.sellAtPercentile,
		buyAtPercentile: newConfig.buyAtPercentile,
		sellTrailingPercent: newConfig.sellTrailingPercent,
		buyTrailingPercent: newConfig.buyTrailingPercent,
		timeframeInDays: newConfig.timeframeInDays,
		alpacaApiKey: newConfig.alpacaApiKey,
		alpacaApiSecret: newConfig.alpacaApiSecret,
	};
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

export default function ConfigForm() {
	const submit = useSubmit();
	const data = useLoaderData() as ConfigInterface;
	const [symbolOptions, setSymbolOptions] = useState<SymbolInterface[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedSymbols, setSelectedSymbols] = useState(data.symbols ?? []);
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
	const [timeframeInDays, setTimeframeInDays] = useState<string>(
		data.timeframeInDays?.toString() ?? ""
	);
	// Query to load inital config
	useEffect(() => {
		setSelectedSymbols(data.symbols ?? []);
		setSellAtPercentile(data.sellAtPercentile?.toString() ?? "");
		setBuyAtPercentile(data.buyAtPercentile?.toString() ?? "");
		setSellTrailingPercent(data.sellTrailingPercent?.toString() ?? "");
		setBuyTrailingPercent(data.buyTrailingPercent?.toString() ?? "");
		setTimeframeInDays(data.timeframeInDays?.toString() ?? "");
	}, [data]);
	// Query to load symbolOptions
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const symbolOptions = await promiseOptions("");
			// Filter out symbolOptions that are already in selectedSymbols
			const filteredOptions = symbolOptions.filter((option) => {
				return (
					selectedSymbols.findIndex(
						(symbol) =>
							symbol.id.toString() === option.id.toString()
					) === -1
				);
			});
			setSymbolOptions(filteredOptions);
			setIsLoading(false);
		})();
	}, []);
	return (
		// You have to make sure your Form has defined the `method` and `action` props and that your invokation of submit() uses the same values for `method` and `action` in the SubmitOptions
		<Form
			method="post"
			action="/config"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const newConfig: NewConfigInterface = {
					symbols: selectedSymbols,
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
					action: "/config",
					encType: "application/json",
				});
			}}
		>
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
						itemId: symbol.id.toString(),
						itemValue: symbol.name,
					};
				})}
				availableItems={symbolOptions.map((option) => {
					return {
						itemId: option.id.toString(),
						itemValue: option.name,
					};
				})}
				isLoading={isLoading}
				onReorder={(items) => {
					const selectedSymbolsReordered: SymbolInterface[] = [];
					items.forEach((item) => {
						const symbolIndex = selectedSymbols.findIndex(
							(symbol) => symbol.id.toString() === item.itemId
						);
						if (symbolIndex !== -1) {
							selectedSymbolsReordered.push(
								selectedSymbols[symbolIndex]
							);
						}
					});
					setSelectedSymbols(
						selectedSymbolsReordered.map((symbol, index) => {
							return {
								...symbol,
								order: index,
							};
						})
					);
				}}
				onAdd={(item) => {
					const optionIndex = symbolOptions.findIndex(
						(option) => option.id.toString() === item.itemId
					);
					const option = symbolOptions[optionIndex];
					const newOptions = [...symbolOptions];
					newOptions.splice(optionIndex, 1);
					setSymbolOptions(newOptions);
					setSelectedSymbols(
						[...selectedSymbols, option].map((symbol, index) => {
							return {
								...symbol,
								order: index,
							};
						})
					);
				}}
				onDelete={(item) => {
					const symbolIndex = selectedSymbols.findIndex(
						(symbol) => symbol.id.toString() === item.itemId
					);
					const symbol = selectedSymbols[symbolIndex];
					const newSymbols = [...selectedSymbols];
					newSymbols.splice(symbolIndex, 1);
					setSelectedSymbols(newSymbols);
					setSymbolOptions([...symbolOptions, symbol]);
				}}
				onCreate={(inputValue) => {
					(async () => {
						setIsLoading(true);
						const response =
							await APIInstance.getSymbolEndpoint().post({
								name: inputValue,
							});
						setSelectedSymbols(
							[...selectedSymbols, response].map(
								(symbol, index) => {
									return {
										...symbol,
										order: index,
									};
								}
							)
						);
						setIsLoading(false);
					})();
				}}
			></DragAndDropRepeaterInput>
			<button type="submit">Submit</button>
		</Form>
	);
}
