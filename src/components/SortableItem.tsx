import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../interfaces/DragAndDrop";
export default function SortableItem({
	itemId,
	itemValue,
	index,
	onDelete = () => {},
}: {
	itemId: string;
	itemValue: string;
	index: number;
	onDelete: (item: Item) => void;
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
					<FontAwesomeIcon
						icon={faMinusCircle}
						onClick={() => onDelete({ itemId, itemValue })}
					/>
				</div>
			)}
		</Draggable>
	);
}
