import { Draggable, DraggableProps } from "react-beautiful-dnd";
export default function SortableItem({
	ref,
	children,
}: {
	children: React.ReactNode;
	ref: (element: HTMLElement | null) => void;
}) {
	return <>{children}</>;
}
