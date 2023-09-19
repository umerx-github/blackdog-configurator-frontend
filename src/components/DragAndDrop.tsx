import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import SortableList from "./SortableList";

export default function DragAndDrop({
	items,
	droppableId,
	onChange,
}: {
	items: { itemId: string; itemValue: string }[];
	droppableId: string;
	onChange: (items: { itemId: string; itemValue: string }[]) => void;
}) {
	const onDragEnd: OnDragEndResponder = (result, provided) => {
		if (result.destination) {
			const newItems = Array.from(items);
			const [removed] = newItems.splice(result.source.index, 1);
			newItems.splice(result.destination.index, 0, removed);
			onChange(newItems);
		}
	};
	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	// https://react.dev/reference/react/forwardRef
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<SortableList
				droppableId={droppableId}
				items={items}
			></SortableList>
		</DragDropContext>
	);
}
