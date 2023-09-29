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
import { Item } from "../interfaces/DragAndDrop";
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
interface LoaderData {
	symbols: Item[];
}

export const loader: LoaderFunction<ConfigInterface> = async () => {
	const config = await APIInstance.getConfigEndpoint().getActive();
	return config;
	// return {
	// 	symbols: [
	// 		{ itemId: "1", itemValue: "AAPL" },
	// 		{ itemId: "2", itemValue: "TSLA" },
	// 		{ itemId: "3", itemValue: "SPY" },
	// 	],
	// };
};

export const action: ActionFunction = async ({ request }) => {
	const body = (await request.json()) as NewConfigInterface;
	console.log({ body });
	return body;
};

/**
 * @todo This needs to be an async function that calls the API
 */
const promiseOptions = async (
	inputValue: string
): Promise<SymbolInterface[]> => {
	console.log("promiseOptions");
	let symbols = await APIInstance.getSymbolEndpoint().get();
	if (inputValue) {
		symbols = symbols.filter((symbol) => {
			return symbol.name.toUpperCase().includes(inputValue.toUpperCase());
		});
	}
	return symbols;
	// return new Promise<Option[]>((resolve) => {
	// 	setTimeout(() => {
	// 		resolve(filterOptions(inputValue));
	// 	}, 1000);
	// });
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
			console.log("setting options");
			setIsLoading(true);
			const options = await promiseOptions("");
			setOptions(options);
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
				const jsonValueSymbols: JsonValue = {
					symbols: symbols.map((item) => {
						return {
							...item,
						};
					}),
				};
				submit(
					{ ...jsonValueFormData, ...jsonValueSymbols },
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
					console.log("new item value change");
					const uppercased = newItemValue.toUpperCase();
					setNewItemValue(uppercased);
					setNewItemId(uppercased);
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
					// Determine if symbol already exists and do not allow duplicates
					if (
						symbols.findIndex(
							(symbol) => item.itemId === symbol.id.toString()
						) !== -1
					) {
						return;
					}
					// Lookup item in options
					const optionIndex = options.findIndex(
						(option) => item.itemId === option.id.toString()
					);
					if (optionIndex === -1) {
						return;
					}
					setSymbols([...symbols, options[optionIndex]]);
					setNewItemValue("");
					setNewItemId("");
				}}
				onDelete={(item) => {
					setSymbols(
						symbols.filter(
							(symbol) => symbol.id.toString() !== item.itemId
						)
					);
				}}
				onCreate={(inputValue) => {
					(async () => {
						console.log("onCreate");
						setIsLoading(true);
						const newOption: Item = {
							itemId: inputValue,
							itemValue: inputValue,
						};
						const response =
							await APIInstance.getSymbolEndpoint().post({
								name: inputValue,
							});
						// @todo AJAX request to create new item
						setOptions([...options, response]);
						setSymbols([...symbols, response]);
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
