import { useRouteError, isRouteErrorResponse } from "react-router-dom";

// TODO: Implement a better error page

const ErrorPage: React.FC = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div id="error-page">
				<h1>{error.status}</h1>
				<p>
					<i>{error.statusText}</i>
				</p>
			</div>
		);
	}
	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
		</div>
	);
};

export default ErrorPage;
