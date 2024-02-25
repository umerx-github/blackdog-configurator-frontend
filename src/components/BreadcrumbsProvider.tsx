import React from "react";
import BreadcrumbsContext, { Breadcrumb } from "./BreadcrumbsContext";

interface BreadcrumbsProviderProps {
	children: React.ReactNode;
}

const BreadcrumbsProvider: React.FC<BreadcrumbsProviderProps> = ({
	children,
}) => {
	const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcrumb[]>([]);

	return (
		<BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
			{children}
		</BreadcrumbsContext.Provider>
	);
};

export default BreadcrumbsProvider;
