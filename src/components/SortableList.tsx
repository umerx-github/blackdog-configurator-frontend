import StrictModeDroppable from "./StrictModeDroppable";
import SortableItem from "./SortableItem";
export default function SortableList({
	droppableId,
	items,
}: {
	droppableId: string;
	items: { itemId: string; itemValue: string }[];
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
						></SortableItem>
					))}
					{provided.placeholder}
				</div>
			)}
		</StrictModeDroppable>
	);
}
