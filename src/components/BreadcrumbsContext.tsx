import React from "react";

export interface Breadcrumb {
	path: string;
	label: string;
}

export interface BreadcrumbsContextProps {
	breadcrumbs: Breadcrumb[];
	setBreadcrumbs: React.Dispatch<React.SetStateAction<Breadcrumb[]>>;
}

const BreadcrumbsContext = React.createContext<BreadcrumbsContextProps>({
	breadcrumbs: [],
	setBreadcrumbs: () => {},
});

export default BreadcrumbsContext;
