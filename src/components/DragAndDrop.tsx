import React from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

export default function DragAndDrop({
	onDragEnd,
	children,
}: {
	onDragEnd: OnDragEndResponder;
	children: React.ReactNode | React.ReactNodeArray;
}) {
	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	// https://react.dev/reference/react/forwardRef
	return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
