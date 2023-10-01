import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import SortableList from "./SortableList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../interfaces/DragAndDrop";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
export interface Option {
	label: string;
	value: string;
}

/**
 *
 * @todo Break out the CreatableSelect into its own component
 */
export default function DragAndDropRepeater({
	droppableId,
	items = [],
	options = [],
	newItemId = "",
	newItemValue = "",
	isLoading = false,
	onNewItemValueChange = () => {},
	onReorder = () => {},
	onAdd = () => {},
	onDelete = () => {},
	onCreate = () => {},
}: {
	droppableId: string;
	items?: Item[];
	options?: Option[];
	newItemId?: string;
	newItemValue?: string;
	isLoading?: boolean;
	onNewItemValueChange?: (newItemValue: string) => void;
	onReorder?: (items: Item[]) => void;
	onAdd?: (item: Item) => void;
	onDelete?: (item: Item) => void;
	onCreate?: (inputValue: string) => void;
}) {
	const onDragEnd: OnDragEndResponder = (result, provided) => {
		if (result.destination) {
			const newItems = Array.from(items);
			const [removed] = newItems.splice(result.source.index, 1);
			newItems.splice(result.destination.index, 0, removed);
			onReorder(newItems);
		}
	};
	// https://dev.to/kyleortiz/getting-started-with-react-beautiful-dnd-using-functional-components-50d0
	// https://react.dev/reference/react/forwardRef
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<SortableList
				droppableId={droppableId}
				items={items}
				onDelete={onDelete}
			></SortableList>
			<div>
				<CreatableSelect
					value={{ label: newItemValue, value: newItemId }}
					// cacheOptions
					// defaultOptions
					// loadOptions={promiseOptions}
					options={options}
					// onInputChange={(inputString) =>
					// 	onNewItemValueChange(inputString || "")
					// }
					onChange={(option) => {
						onNewItemValueChange(option?.value || "");
					}}
					onCreateOption={(inputValue) => onCreate(inputValue)}
					isLoading={isLoading}
					isDisabled={isLoading}
				/>
				<FontAwesomeIcon
					icon={faPlusCircle}
					onClick={() => {
						onAdd({ itemId: newItemId, itemValue: newItemValue });
					}}
				/>
			</div>
		</DragDropContext>
	);
}
