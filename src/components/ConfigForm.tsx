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

export const action: ActionFunction = ({ request }) => {
	console.log("running action");
	return "";
};

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	const submit = useSubmit();
	return (
		<Form
			onSubmit={() => {
				console.log("submitting form");
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
