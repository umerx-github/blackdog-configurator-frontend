import { useRef } from "react";
import SortableItem from "./SortableItem";
import SortableList from "./SortableList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useEffect, useState } from "react";
import { DroppableProps } from "react-beautiful-dnd";

/**
 *
 * @link https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1684893089
 * @link https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4
 */
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));

		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	}, []);

	if (!enabled) {
		return null;
	}

	return <Droppable {...props}>{children}</Droppable>;
};

export default function DragAndDrop({ items }: { items: string[] }) {
	const sortableListRef = useRef<HTMLDivElement>(null);

	const onDragEnd = (result: any) => {
		console.log({ result });
		//TODO
	};

	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	// https://react.dev/reference/react/forwardRef
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<StrictModeDroppable droppableId={"config-sortable-symbols"}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<h2>Drag and Drop</h2>
						{items.map((item, index) => (
							<Draggable
								draggableId={item}
								key={item}
								index={index}
							>
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
						))}
						{provided.placeholder}
					</div>
				)}
			</StrictModeDroppable>
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
