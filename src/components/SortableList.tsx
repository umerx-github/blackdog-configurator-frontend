import StrictModeDroppable from "./StrictModeDroppable";
import SortableItem from "./SortableItem";
export default function SortableList({
	droppableId,
	items,
}: {
	droppableId: string;
	items: string[];
}) {
	return (
		<StrictModeDroppable droppableId={droppableId}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<h2>Drag and Drop</h2>
					{items.map((item, index) => (
						<SortableItem
							item={item}
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
