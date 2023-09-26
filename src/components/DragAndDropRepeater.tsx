import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import SortableList from "./SortableList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../interfaces/DragAndDrop";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
interface Option {
	label: string;
	value: string;
}

const myOptions: Option[] = [
	{ label: "foo", value: "foo" },
	{ label: "bar", value: "bar" },
	{ label: "baz", value: "baz" },
];

const filterOptions = (inputValue: string) => {
	if (!inputValue) {
		return myOptions;
	}
	return myOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

/**
 * @todo This needs to be an async function that calls the API
 */
const promiseOptions = (inputValue: string) => {
	console.log("promiseOptions");
	return new Promise<Option[]>((resolve) => {
		setTimeout(() => {
			resolve(filterOptions(inputValue));
		}, 1000);
	});
};

/**
 *
 * @todo Break out the CreatableSelect into its own component
 */
export default function DragAndDropRepeater({
	items,
	newItemId,
	newItemValue,
	droppableId,
	onNewItemValueChange = () => {},
	onReorder = () => {},
	onAdd = () => {},
	onDelete = () => {},
}: {
	items: Item[];
	newItemId: string;
	newItemValue: string;
	droppableId: string;
	onNewItemValueChange?: (newItemValue: string) => void;
	onReorder?: (items: Item[]) => void;
	onAdd?: (item: Item) => void;
	onDelete?: (item: Item) => void;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState<Option[]>([]);
	useEffect(() => {
		(async () => {
			const newOptions = await promiseOptions("");
			setOptions(newOptions);
		})();
	}, [items]);
	const onDragEnd: OnDragEndResponder = (result, provided) => {
		if (result.destination) {
			const newItems = Array.from(items);
			const [removed] = newItems.splice(result.source.index, 1);
			newItems.splice(result.destination.index, 0, removed);
			onReorder(newItems);
		}
	};
	const onCreate = (inputValue: string) => {
		setIsLoading(true);
		setTimeout(() => {
			const newOption: Item = {
				itemId: inputValue,
				itemValue: inputValue,
			};
			onAdd(newOption);
			setIsLoading(false);
		}, 1000);
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
					onChange={(option) =>
						onNewItemValueChange(option?.value || "")
					}
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
