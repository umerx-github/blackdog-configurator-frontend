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

export const loader: LoaderFunction<LoaderData> = async () => {
	return {
		symbols: [
			{ itemId: "1", itemValue: "AAPL" },
			{ itemId: "2", itemValue: "TSLA" },
			{ itemId: "3", itemValue: "SPY" },
		],
	};
};

export const action: ActionFunction = async ({ request }) => {
	const body = await request.json();
	return body;
};

const myOptions: Option[] = [
	{ label: "foo", value: "foo" },
	{ label: "bar", value: "bar" },
	{ label: "baz", value: "baz" },
];

const filterOptions = (inputValue: string) => {
	if (!inputValue) {
		return myOptions;
	}
	return myOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

/**
 * @todo This needs to be an async function that calls the API
 */
const promiseOptions = async (inputValue: string) => {
	console.log("promiseOptions");
	let symbols = await APIInstance.getSymbolEndpoint().get();
	if (inputValue) {
		symbols = symbols.filter((symbol) => {
			return symbol.name.toLowerCase().includes(inputValue.toLowerCase());
		});
	}
	return symbols.map((symbol) => {
		return { label: symbol.name, value: symbol.name };
	});
	// return new Promise<Option[]>((resolve) => {
	// 	setTimeout(() => {
	// 		resolve(filterOptions(inputValue));
	// 	}, 1000);
	// });
};

export default function ConfigForm() {
	const submit = useSubmit();
	const data = useLoaderData() as LoaderData;
	const [options, setOptions] = useState<Option[]>([]);
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
							itemId: item.itemId,
							itemValue: item.itemValue,
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
				items={symbols}
				options={options}
				newItemId={newItemId}
				newItemValue={newItemValue}
				isLoading={isLoading}
				onNewItemValueChange={(newItemValue) => {
					console.log("new item value change");
					setNewItemValue(newItemValue);
					setNewItemId(newItemValue);
				}}
				onReorder={(items) => {
					setSymbols([...items]);
				}}
				onAdd={(item) => {
					// Determine if symbol already exists and do not allow duplicates
					if (
						symbols.findIndex(
							(symbol) => item.itemValue === symbol.itemValue
						) !== -1
					) {
						return;
					}
					setSymbols([...symbols, item]);
					setNewItemValue("");
					setNewItemId("");
				}}
				onDelete={(item) => {
					setSymbols(
						symbols.filter(
							(symbol) => symbol.itemId !== item.itemId
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
						setOptions([
							...options,
							{ label: inputValue, value: inputValue },
						]);
						setSymbols([...symbols, newOption]);
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
