import { useEffect, useState } from "react";
import APIInstance from "../lib/backend/api";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
} from "react-router-dom";
import DragAndDropRepeater, { Option } from "./DragAndDropRepeater";
import {
	ConfigInterface,
	NewConfigInterface,
	SymbolInterface,
} from "../interfaces/backend/api";

type JsonObject = {
	[Key in string]: JsonValue;
} & {
	[Key in string]?: JsonValue | undefined;
};
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

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
		(data.sellAtPercentile ?? 0).toFixed(2).toString()
	);
	const [newItemValue, setNewItemValue] = useState("");
	const [newItemId, setNewItemId] = useState("");
	// Query to load inital config
	useEffect(() => {
		setSelectedSymbols(data.symbols ?? []);
	}, [data.symbols]);
	// Query to load inital config
	useEffect(() => {
		setSellAtPercentile((data.sellAtPercentile ?? 0).toFixed(2).toString());
	}, [data.sellAtPercentile]);
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
				// const jsonValueFormData: JsonValue = Array.from(
				// 	formData.entries()
				// ).reduce((acc, entry) => {
				// 	const key = entry[0];
				// 	const value = Number(entry[1].toString());
				// 	return { ...acc, ...{ [key]: value } };
				// }, {});
				const jsonValueSymbols: JsonValue = {
					symbols: selectedSymbols.map((symbol) => {
						return { ...symbol };
					}),
				};
				submit(
					{
						...jsonValueSymbols,
						sellAtPercentile: Number(
							formData.get("sellAtPercentile") ?? ""
						),
					},
					{
						method: "post",
						action: "/config",
						encType: "application/json",
					}
				);
			}}
		>
			<label htmlFor="sellAtPercentile">Sell At Percentile</label>
			<input
				type="text"
				name="sellAtPercentile"
				pattern="[0-9]*[.]?[0-9]{0,2}"
				title="Enter a valid number with up to 2 decimal places."
				value={sellAtPercentile}
				onChange={(e) => {
					setSellAtPercentile(e.target.value);
				}}
				onBlur={(e) => {
					let floatVal = parseFloat(e.target.value);
					if (isNaN(floatVal)) {
						floatVal = 0;
					}
					setSellAtPercentile(floatVal.toFixed(2).toString());
				}}
				// defaultValue={data.sellAtPercentile}
			></input>
			<DragAndDropRepeater
				droppableId="selectedSymbols"
				items={selectedSymbols.map((symbol) => {
					return {
						itemId: symbol.id.toString(),
						itemValue: symbol.name,
					};
				})}
				options={symbolOptions.map((option) => {
					return { label: option.name, value: option.id.toString() };
				})}
				newItemId={newItemId}
				newItemValue={newItemValue}
				isLoading={isLoading}
				onNewItemValueChange={(newItemValue) => {
					const newItem = symbolOptions.find(
						(option) => option.id.toString() === newItemValue
					);
					if (newItem) {
						setNewItemId(newItem.id.toString());
						setNewItemValue(newItem.name);
					}
				}}
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
					setNewItemValue("");
					setNewItemId("");
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
					// @todo Add item back to symbolOptions
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
						// @todo Remove the item from symbolOptions
						// setSymbolOptions([...symbolOptions, response]);
						setNewItemValue("");
						setNewItemId("");
						setIsLoading(false);
					})();
				}}
			></DragAndDropRepeater>
			<button type="submit">Submit</button>
		</Form>
	);
}
