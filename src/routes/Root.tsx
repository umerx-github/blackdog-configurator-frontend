import React, { useState } from "react";
import { ToggleState } from "../interfaces/settings";
import BlackDogHeader from "../components/BlackdogHeader";
import Toggle from "../components/Toggle";
import BreadcrumbsProvider from "../components/BreadcrumbsProvider";
import Breadcrumbs from "../components/Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { Outlet } from "react-router-dom";
import ToggleInnerMoonAndSun from "../components/ToggleInnerMoonAndSun";

const Root: React.FC = () => {
	const [darkModeState, setDarkModeState] = useState<ToggleState>(
		ToggleState.off
	);
	const toggleDarkMode = (newState: ToggleState) => {
		setDarkModeState(newState);
	};

	return (
		<>
			<div
				className={`configurator-app ${
					darkModeState === ToggleState.on ? "dark" : ""
				}`}
			>
				<div className="min-h-screen dark:bg-zinc-900 dark:text-white transition-bg duration-1000">
					<div className="blackdog-navbar bg-zinc-300 dark:bg-zinc-700 transition-bg duration-1000">
						<div className="flex justify-between p-4">
							<BlackDogHeader />
							<Toggle
								toggleState={darkModeState}
								onChange={toggleDarkMode}
							>
								<ToggleInnerMoonAndSun
									toggleState={darkModeState}
								></ToggleInnerMoonAndSun>
							</Toggle>
						</div>
					</div>
					<BreadcrumbsProvider>
						<div className="blackdog-breadcrumbs text-zinc-500 dark:text-zinc-400 text-sm px-4 py-2 bg-zinc-200 dark:bg-zinc-800 transition-bg duration-1000">
							<Breadcrumbs />
						</div>
						<div className="blackdog-main-content">
							<div className="p-4">
								<Outlet />
							</div>
						</div>
					</BreadcrumbsProvider>
				</div>
			</div>
		</>
	);
};

export default Root;
