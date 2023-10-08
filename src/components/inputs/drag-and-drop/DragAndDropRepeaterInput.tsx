import { useState } from "react";
import { Item } from "../../../interfaces/components/inputs/drag-and-drop";
import DragAndDropRepeater from "./DragAndDropRepeater";

/**
 *
 * @todo Break out the CreatableSelect into its own component
 */
export default function DragAndDropRepeaterInput({
	droppableId,
	selectedItems = [],
	availableItems = [],
	isLoading = false,
	onReorder = () => {},
	onAdd = () => {},
	onDelete = () => {},
	onCreate = () => {},
}: {
	droppableId: string;
	selectedItems?: Item[];
	availableItems?: Item[];
	isLoading?: boolean;
	onReorder?: (items: Item[]) => void;
	onAdd?: (item: Item) => void;
	onDelete?: (item: Item) => void;
	onCreate?: (inputValue: string) => void;
}) {
	const [newItemId, setNewItemId] = useState("");
	const [newItemValue, setNewItemValue] = useState("");
	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	// https://react.dev/reference/react/forwardRef
	return (
		<DragAndDropRepeater
			droppableId={droppableId}
			selectedItems={selectedItems}
			availableItems={availableItems}
			newItemId={newItemId}
			newItemValue={newItemValue}
			isLoading={isLoading}
			onNewItemValueChange={(newItemValue) => {
				const newItem = availableItems.find(
					(option) => option.itemId === newItemValue
				);
				if (newItem) {
					setNewItemId(newItem.itemId);
					setNewItemValue(newItem.itemValue);
				}
			}}
			onReorder={(items) => {
				onReorder(items);
			}}
			onAdd={(item) => {
				setNewItemValue("");
				setNewItemId("");
				onAdd(item);
			}}
			onDelete={(item) => {
				onDelete(item);
			}}
			onCreate={(inputValue) => {
				setNewItemValue("");
				setNewItemId("");
				onCreate(inputValue);
			}}
		></DragAndDropRepeater>
	);
}
