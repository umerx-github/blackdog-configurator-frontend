import React, { useContext, useEffect } from "react";
import LargeButton from "../components/buttons/LargeButton";
import { faChess } from "@fortawesome/free-solid-svg-icons/faChess";
import { Link } from "react-router-dom";
import BreadcrumbsContext from "../components/breadcrumbs/BreadcrumbsContext";

const Home: React.FC = () => {
	const { setBreadcrumbs } = useContext(BreadcrumbsContext);

	useEffect(() => {
		setBreadcrumbs([
			{
				label: "Home",
				path: "",
			},
		]);
	}, []);

	return (
		<Link to="strategy">
			<LargeButton icon={faChess} text="Strategies" />
		</Link>
	);
};

export default Home;
