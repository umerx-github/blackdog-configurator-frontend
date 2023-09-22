import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import SortableList from "./SortableList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../interfaces/DragAndDrop";

export default function DragAndDropRepeater({
	items,
	newItemId,
	newItemValue,
	droppableId,
	onNewItemValueChange = () => {},
	onReorder = () => {},
	onAdd = () => {},
	onDelete = () => {},
}: {
	items: Item[];
	newItemId: string;
	newItemValue: string;
	droppableId: string;
	onNewItemValueChange?: (newItemValue: string) => void;
	onReorder?: (items: Item[]) => void;
	onAdd?: (item: Item) => void;
	onDelete?: (item: Item) => void;
}) {
	const onDragEnd: OnDragEndResponder = (result, provided) => {
		if (result.destination) {
			const newItems = Array.from(items);
			const [removed] = newItems.splice(result.source.index, 1);
			newItems.splice(result.destination.index, 0, removed);
			onReorder(newItems);
		}
	};
	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	// https://react.dev/reference/react/forwardRef
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<SortableList
				droppableId={droppableId}
				items={items}
				onDelete={onDelete}
			></SortableList>
			<div>
				<input
					type="text"
					value={newItemValue}
					onChange={(e) => onNewItemValueChange(e.target.value)}
				></input>
				<FontAwesomeIcon
					icon={faPlusCircle}
					onClick={() => {
						onAdd({ itemId: newItemId, itemValue: newItemValue });
					}}
				/>
			</div>
		</DragDropContext>
	);
}
