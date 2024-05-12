import { Client } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// TODO: Get loaders to throw 404 errors

const ErrorPage: React.FC = () => {
	const error = useRouteError();
	let heading = "Oops!";
	let message = "errorSorry, an unexpected error has occurred.";
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			message =
				"🐾 Oh no, we've fetched far and wide but couldn't dig up what you're looking for! Please try again later - or check whether you're barking up the wrong tree! 🐾";
			heading = error.status.toString();
		} else if (error.status >= 400 && error.status < 500) {
			message =
				"🐾 Whoops! Looks like we've chased our own tail here. 🐾";
			heading = error.status.toString();
		} else if (error.status >= 500) {
			message = `🐾 Oops! Our servers are having a bit of a "ruff" day and couldn't fetch your request. Please try again later or check your input. 🐾`;
			heading = error.status.toString();
		} else {
			message = "🐾 Uh-oh! Looks like we've lost the fetch stick. 🐾";
			heading = error.status.toString();
		}
	} else if (error instanceof Client.ClientResponseError) {
		if (error.statusCode === 404) {
			message =
				"🐾 Oh no, we've fetched far and wide but couldn't dig up what you're looking for! Please try again later - or check whether you're barking up the wrong tree! 🐾";
			heading = error.statusCode.toString();
		} else if (error.statusCode >= 400 && error.statusCode < 500) {
			message = "Client Error";
			heading = error.statusCode.toString();
		} else {
			message = "Server Error";
			heading = error.statusCode.toString();
		}
	}
	return (
		<div id="error-page">
			<h1 className="text-2xl font-bold mb-2">{heading}</h1>
			<p>{message}</p>
		</div>
	);
};

export default ErrorPage;
