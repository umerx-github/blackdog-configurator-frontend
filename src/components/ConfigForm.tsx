import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
} from "react-router-dom";

interface LoaderData {
	symbols: string[];
}

export const loader: LoaderFunction<LoaderData> = async () => {
	return { symbols: ["AAPL", "GOOG", "TSLA"] };
};

export const action: ActionFunction = async ({ request }) => {
	const body = await request.json();
	console.log({ body });
	return "";
};

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	const submit = useSubmit();
	return (
		<Form
			onSubmit={(e) => {
				const formData = new FormData(e.currentTarget);
				const formDataObject = {
					...Object.fromEntries(formData.entries()),
					symbols,
				};
				submit(formDataObject, {
					method: "post",
					encType: "application/json",
				});
			}}
		>
			<DragAndDrop
				items={symbols.map((symbol) => {
					return { itemId: symbol, itemValue: symbol };
				})}
				droppableId="symbols"
				onChange={(items) => {
					setSymbols(items.map((item) => item.itemValue));
				}}
			></DragAndDrop>
			<button type="submit">Submit</button>
		</Form>
	);
}
