import { useEffect, useState } from "react";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
} from "react-router-dom";
import DragAndDropRepeater from "./DragAndDropRepeater";
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

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	const [newItemValue, setNewItemValue] = useState("");
	const [newItemId, setNewItemId] = useState("");
	useEffect(() => {
		setSymbols(data.symbols ?? []);
	}, [data.symbols]);
	const submit = useSubmit();
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
				items={symbols}
				newItemValue={newItemValue}
				newItemId={newItemId}
				onNewItemValueChange={(newItemValue) => {
					setNewItemValue(newItemValue);
					setNewItemId(newItemValue);
				}}
				droppableId="symbols"
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
			></DragAndDropRepeater>
			<button type="submit">Submit</button>
		</Form>
	);
}
