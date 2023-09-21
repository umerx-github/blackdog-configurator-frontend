import { useEffect, useState } from "react";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DragAndDropRepeater from "./DragAndDropRepeater";

interface LoaderData {
	symbols: string[];
}

export const loader: LoaderFunction<LoaderData> = async () => {
	return { symbols: ["AAPL", "GOOG", "TSLA"] };
};

export const action: ActionFunction = async ({ request }) => {
	const body = await request.json();
	return body;
};

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	const [newItemValue, setNewItemValue] = useState("");
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
				submit(
					{ ...Object.fromEntries(formData.entries()), symbols },
					{
						method: "post",
						action: "/config",
						encType: "application/json",
					}
				);
			}}
		>
			<DragAndDropRepeater
				items={symbols.map((symbol) => {
					return { itemId: symbol, itemValue: symbol };
				})}
				newItemValue={newItemValue}
				onNewItemValueChange={(newItemValue) => {
					setNewItemValue(newItemValue);
				}}
				droppableId="symbols"
				onReorder={(items) => {
					setSymbols(items.map((item) => item.itemValue));
				}}
				onAdd={(item) => {
					setSymbols([...symbols, item]);
					setNewItemValue("");
				}}
			></DragAndDropRepeater>
			<button type="submit">Submit</button>
		</Form>
	);
}
