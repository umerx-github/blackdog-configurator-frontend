import { Draggable } from "react-beautiful-dnd";
export default function SortableItem({
	item,
	index,
}: {
	item: string;
	index: number;
}) {
	return (
		<Draggable draggableId={item} key={item} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<>{item}</>
				</div>
			)}
		</Draggable>
	);
}
