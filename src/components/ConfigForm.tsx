import { useEffect, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
} from "react-router-dom";

interface LoaderData {
	symbols: string[];
}

export const loader: LoaderFunction<LoaderData> = async () => {
	return { symbols: ["AAPL", "GOOG", "TSLA"] };
};

export const action: ActionFunction = async ({ request }) => {
	const body = await request.json();
	return body;
};

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	const [symbols, setSymbols] = useState(data.symbols ?? []);
	useEffect(() => {
		setSymbols(data.symbols ?? []);
	}, [data.symbols]);
	const submit = useSubmit();
	return (
		// You have to make sure your Form has defined the `method` and `action` props and that your invokation of submit() uses the same values for `method` and `action` in the SubmitOptions
		<Form
			method="post"
			action="/config"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				submit(
					{ ...Object.fromEntries(formData.entries()), symbols },
					{
						method: "post",
						action: "/config",
						encType: "application/json",
					}
				);
			}}
		>
			<DragAndDrop
				items={symbols.map((symbol) => {
					return { itemId: symbol, itemValue: symbol };
				})}
				droppableId="symbols"
				onChange={(items) => {
					setSymbols(items.map((item) => item.itemValue));
				}}
			></DragAndDrop>

			<button type="submit">Submit</button>
		</Form>
	);
}
