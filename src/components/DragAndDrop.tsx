import { useRef } from "react";
import SortableItem from "./SortableItem";
import SortableList from "./SortableList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DragAndDrop({ items }: { items: string[] }) {
	const sortableListRef = useRef<HTMLDivElement>(null);

	const onDragEnd = (result: any) => {
		console.log({ result });
		//TODO
	};

	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={"config-sortable-symbols"}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{items.map((item, index) => (
							<Draggable
								key={item}
								draggableId={item}
								index={index}
							>
								{(provided) => (
									<SortableItem
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<>{item}</>
									</SortableItem>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

// WORKS
/*
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={"config-sortable-symbols"}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{provided.placeholder};
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
*/
