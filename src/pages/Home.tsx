import React, { useContext, useEffect } from "react";
import LargeButton from "../components/LargeButton";
import { faChess } from "@fortawesome/free-solid-svg-icons/faChess";
import { Link } from "react-router-dom";
import BreadcrumbsContext from "../components/BreadcrumbsContext";

const Home: React.FC = () => {
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);

	useEffect(() => {
		setBreadcrumbs([
			{
				label: "Home",
				path: "/",
			},
		]);
	}, [setBreadcrumbs]);

	return (
		<Link to="/Strategy">
			<LargeButton icon={faChess} text="Strategies" />
		</Link>
	);
};

export default Home;
