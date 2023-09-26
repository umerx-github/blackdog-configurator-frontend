import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import SortableList from "./SortableList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Item } from "../interfaces/DragAndDrop";
import AsyncSelect from "react-select/async";

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
	return myOptions.filter((i) =>
		i.label.toLowerCase().includes(inputValue.toLowerCase())
	);
};

const promiseOptions = (inputValue: string) =>
	new Promise<Option[]>((resolve) => {
		setTimeout(() => {
			resolve(filterOptions(inputValue));
		}, 1000);
	});

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
				<AsyncSelect
					value={{ label: newItemValue, value: newItemId }}
					cacheOptions
					defaultOptions
					loadOptions={promiseOptions}
					onChange={(e) => onNewItemValueChange(e?.value || "")}
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
