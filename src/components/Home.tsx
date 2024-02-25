import React from "react";
import LargeButton from "../components/LargeButton";
import { faChess } from "@fortawesome/free-solid-svg-icons/faChess";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<Link to="/strategy">
			<LargeButton icon={faChess} text="Strategies" />
		</Link>
	);
};

export default Home;
