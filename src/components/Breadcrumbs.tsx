import { useContext } from "react";
import { Link } from "react-router-dom";
import BreadcrumbsContext from "./BreadcrumbsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

const Breadcrumbs = () => {
	const { breadcrumbs } = useContext(BreadcrumbsContext);
	const chevron = (
		<FontAwesomeIcon icon={faChevronRight} className="text-xs" />
	);

	return (
		<div>
			{breadcrumbs.map((breadcrumb, index) => (
				<span key={breadcrumb.path}>
					<Link to={breadcrumb.path}>{breadcrumb.label}</Link>
					{index < breadcrumbs.length - 1 && <> {chevron} </>}
				</span>
			))}
		</div>
	);
};

export default Breadcrumbs;
