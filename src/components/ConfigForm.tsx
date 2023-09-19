import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import SortableList from "./SortableList";
import { useLoaderData } from "react-router-dom";
import { OnDragEndResponder } from "react-beautiful-dnd";

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
	const onDragEnd: OnDragEndResponder = (result, provided) => {
		if (result.destination) {
			const newSymbols = Array.from(symbols);
			const [removed] = newSymbols.splice(result.source.index, 1);
			newSymbols.splice(result.destination.index, 0, removed);
			setSymbols(newSymbols);
		}
	};
	return (
		<DragAndDrop onDragEnd={onDragEnd}>
			<SortableList
				droppableId={"config-sortable-symbols"}
				items={symbols}
			></SortableList>
		</DragAndDrop>
	);
}
