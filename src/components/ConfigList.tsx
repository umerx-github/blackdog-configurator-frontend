import { Link, useLoaderData } from "react-router-dom";
import APIInstance from "../lib/backend/api";
import { ConfigInterface } from "../interfaces/lib/backend/api/common";

export async function loader() {
	return await APIInstance.getConfigEndpoint().get();
}

export default function ConfigList() {
	const data = useLoaderData() as ConfigInterface[];
	return (
		<>
			<ul>
				{data.map((config) => {
					return (
						<li key={config.id}>
							<Link to={config.id.toString()}>{config.id}</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}
