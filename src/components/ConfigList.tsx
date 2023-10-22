import { useLoaderData } from "react-router-dom";
import APIInstance from "../lib/backend/api";
import { ConfigInterface } from "../interfaces/lib/backend/api";

export async function loader() {
	const data = await APIInstance.getConfigEndpoint().get();
	return data;
}

export default function ConfigList() {
	const data = useLoaderData() as ConfigInterface[];
	return (
		<>
			<ul>
				{data.map((config) => {
					return <li key={config.id}>{config.id}</li>;
				})}
			</ul>
		</>
	);
}
