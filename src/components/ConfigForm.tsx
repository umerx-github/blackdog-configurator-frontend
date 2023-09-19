import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import { useLoaderData } from "react-router-dom";

interface LoaderData {
	symbols: string[];
}

export async function loader(): Promise<LoaderData> {
	return {
		symbols: ["AZN", "APL", "ABC", "XYZ"],
	};
}

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	return (
		<DragAndDrop
			items={symbols.map((symbol) => {
				return { itemId: symbol, itemValue: symbol };
			})}
			droppableId="symbols"
			onChange={(items) => {
				setSymbols(items.map((item) => item.itemValue));
			}}
		></DragAndDrop>
	);
}
