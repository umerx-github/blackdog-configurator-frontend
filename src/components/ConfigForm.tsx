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
	let symbols = await APIInstance.getSymbolEndpoint().get();
	if (inputValue) {
		symbols = symbols.filter((symbol) => {
			return symbol.name.toUpperCase().includes(inputValue.toUpperCase());
		});
	}
	return symbols;
};

export default function ConfigForm() {
	const submit = useSubmit();
	const data = useLoaderData() as ConfigInterface;
	const [options, setOptions] = useState<SymbolInterface[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	const [newItemValue, setNewItemValue] = useState("");
	const [newItemId, setNewItemId] = useState("");
	// Query to load inital config
	useEffect(() => {
		setSymbols(data.symbols ?? []);
	}, [data.symbols]);
	// Query to load options
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const options = await promiseOptions("");
			// Filter out options that are already in symbols
			const filteredOptions = options.filter((option) => {
				return (
					symbols.findIndex(
						(symbol) =>
							symbol.id.toString() === option.id.toString()
					) === -1
				);
			});
			setOptions(filteredOptions);
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
				const jsonValueFormData: JsonValue = Array.from(
					formData.entries()
				).map((entry) => {
					return { [entry[0]]: entry[1].toString() };
				});
				const jsonValueSymbolIds: JsonValue = {
					symbolIds: symbols.map((item) => item.id),
				};
				submit(
					{ ...jsonValueFormData, ...jsonValueSymbolIds },
					{
						method: "post",
						action: "/config",
						encType: "application/json",
					}
				);
			}}
		>
			<DragAndDropRepeater
				droppableId="symbols"
				items={symbols.map((symbol) => {
					return {
						itemId: symbol.id.toString(),
						itemValue: symbol.name,
					};
				})}
				options={options.map((option) => {
					return { label: option.name, value: option.id.toString() };
				})}
				newItemId={newItemId}
				newItemValue={newItemValue}
				isLoading={isLoading}
				onNewItemValueChange={(newItemValue) => {
					const newItem = options.find(
						(option) => option.id.toString() === newItemValue
					);
					if (newItem) {
						setNewItemId(newItem.id.toString());
						setNewItemValue(newItem.name);
					}
				}}
				onReorder={(items) => {
					const symbolsReordered: SymbolInterface[] = [];
					items.forEach((item) => {
						const symbolIndex = symbols.findIndex(
							(symbol) => symbol.id.toString() === item.itemId
						);
						if (symbolIndex !== -1) {
							symbolsReordered.push(symbols[symbolIndex]);
						}
					});
					setSymbols(symbolsReordered);
				}}
				onAdd={(item) => {
					const optionIndex = options.findIndex(
						(option) => option.id.toString() === item.itemId
					);
					const option = options[optionIndex];
					const newOptions = [...options];
					newOptions.splice(optionIndex, 1);
					setOptions(newOptions);
					setSymbols([...symbols, option]);
					setNewItemValue("");
					setNewItemId("");
				}}
				onDelete={(item) => {
					const symbolIndex = symbols.findIndex(
						(symbol) => symbol.id.toString() === item.itemId
					);
					const symbol = symbols[symbolIndex];
					const newSymbols = [...symbols];
					newSymbols.splice(symbolIndex, 1);
					setSymbols(newSymbols);
					setOptions([...options, symbol]);
					// @todo Add item back to options
				}}
				onCreate={(inputValue) => {
					(async () => {
						setIsLoading(true);
						const response =
							await APIInstance.getSymbolEndpoint().post({
								name: inputValue,
							});
						setSymbols([...symbols, response]);
						// @todo Remove the item from options
						// setOptions([...options, response]);
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
