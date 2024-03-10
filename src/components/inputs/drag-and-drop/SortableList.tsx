import StrictModeDroppable from "./StrictModeDroppable";
import SortableItem from "./SortableItem";
import { Item } from "../../../interfaces/components/inputs/drag-and-drop";
export default function SortableList({
	droppableId,
	items,
	onDelete = () => {},
}: {
	droppableId: string;
	items: Item[];
	onDelete?: (item: Item) => void;
}) {
	return (
		<StrictModeDroppable droppableId={droppableId}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					{items.map((item, index) => (
						<SortableItem
							itemId={item.itemId}
							itemValue={item.itemValue}
							index={index}
							key={index}
							onDelete={onDelete}
						></SortableItem>
					))}
					{provided.placeholder}
				</div>
			)}
		</StrictModeDroppable>
	);
}
