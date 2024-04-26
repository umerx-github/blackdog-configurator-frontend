import { Client } from "@umerx/umerx-blackdog-configurator-client-typescript";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// TODO: Implement a better error page

const ErrorPage: React.FC = () => {
	const error = useRouteError();
	console.log({ error });
	let heading = "Oops!";
	let message = "Sorry, an unexpected error has occurred.";
	if (isRouteErrorResponse(error)) {
		heading = error.status.toString();
		message = error.statusText;
	} else if (error instanceof Client.ClientResponseError) {
		if (error.statusCode === 404) {
			heading =
				"🐾 Oh no, we've fetched far and wide but couldn't dig up what you're looking for! It seems to have buried itself too well! Please try again later - or check whether you're barking up the wrong tree! 🐾";
			message = error.message;
		} else if (error.statusCode >= 400 && error.statusCode < 500) {
			heading = "Client Error";
			message = error.message;
		} else {
			heading = "Server Error";
			message = error.message;
		}
	}
	return (
		<div id="error-page">
			<h1>{heading}!</h1>
			<p>
				<i>{message}</i>
			</p>
		</div>
	);
};

export default ErrorPage;
