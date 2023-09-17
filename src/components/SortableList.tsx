import React, { forwardRef } from "react";
import { DroppableProvidedProps } from "react-beautiful-dnd";

export default forwardRef(function SortableList(
	{
		children,
		innerRef,
	}: // innerRef,
	// ref,
	// innerRef,
	// ref,
	DroppableProvidedProps & {
		children: React.ReactNode;
		// ref: (element: HTMLElement | null) => void;
		// ref: RefObject<HTMLDivElement>;
		innerRef: (element: HTMLElement | null) => void;
	},
	ref: React.LegacyRef<HTMLDivElement> | undefined
) {
	return <div ref={ref}></div>;
	return <div>{children}</div>;
});

// export default function SortableList({
// 	children,
// 	innerRef,
// 	...props
// }: DroppableProps & { children: React.ReactNode; innerRef: any }) {
// 	return <>{children}</>;
// }
