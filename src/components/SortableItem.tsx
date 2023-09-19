import { Draggable } from "react-beautiful-dnd";
export default function SortableItem({
	itemId,
	itemValue,
	index,
}: {
	itemId: string;
	itemValue: string;
	index: number;
}) {
	return (
		<Draggable draggableId={itemId} key={itemId} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<>{itemValue}</>
				</div>
			)}
		</Draggable>
	);
}
