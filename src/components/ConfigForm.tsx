import { useEffect, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import {
	Form,
	useLoaderData,
	ActionFunction,
	LoaderFunction,
	useSubmit,
	redirect,
} from "react-router-dom";

interface LoaderData {
	symbols: string[];
}

export const loader: LoaderFunction<LoaderData> = async () => {
	console.log("loader");
	return { symbols: ["AAPL", "GOOG", "TSLA"] };
};

export const action: ActionFunction = async ({ request }) => {
	// const body = await request.json();
	// console.log({ body });
	console.log("action");
	return "";
	// return redirect("/config");
};

export default function ConfigForm() {
	const data = useLoaderData() as LoaderData;
	// const [symbols, setSymbols] = useState(data.symbols ?? []);
	// useEffect(() => {
	// 	setSymbols(data.symbols ?? []);
	// }, [data.symbols]);
	const submit = useSubmit();
	return (
		<Form
			method="post"
			action="/config"
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget);
				const formDataObject = {
					...Object.fromEntries(formData.entries()),
				};
				submit(
					{ thing: "hi" },
					{
						method: "post",
						action: "/config",
						encType: "application/json",
					}
				);
			}}
		>
			<button type="submit">Submit</button>
		</Form>
		// <Form
		// 	onSubmit={(e) => {
		// 		const formData = new FormData(e.currentTarget);
		// 		const formDataObject = {
		// 			...Object.fromEntries(formData.entries()),
		// 			symbols,
		// 		};
		// 		submit(formDataObject, {
		// 			method: "post",
		// 			encType: "application/json",
		// 		});
		// 	}}
		// >
		// 	<DragAndDrop
		// 		items={symbols.map((symbol) => {
		// 			return { itemId: symbol, itemValue: symbol };
		// 		})}
		// 		droppableId="symbols"
		// 		onChange={(items) => {
		// 			setSymbols(items.map((item) => item.itemValue));
		// 		}}
		// 	></DragAndDrop>
		// 	<button type="submit">Submit</button>
		// </Form>
	);
}
