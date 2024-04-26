import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PageNumberNavigatorProps {
	currentPageNumber: number;
	setCurrentPageNumber: (currentPageNumber: number) => void;
	totalPages: number;
}

const PageNumberNavigator: React.FC<PageNumberNavigatorProps> = ({
	currentPageNumber,
	setCurrentPageNumber,
	totalPages,
}) => {
	return (
		<div className="page-number-navigator my-2 text-sm">
			<button
				onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
				disabled={currentPageNumber === 1}
				className="border border-zinc-300 dark:border-zinc-600 px-2 py-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-auto"
			>
				<FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
				&nbsp;Previous
			</button>
			<span className="mx-2">
				{currentPageNumber} of {totalPages}
			</span>
			<button
				onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
				disabled={currentPageNumber === totalPages}
				className="border border-zinc-300 dark:border-zinc-600 px-2 py-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-auto"
			>
				Next&nbsp;
				<FontAwesomeIcon icon={faChevronRight} className="text-xs" />
			</button>
		</div>
	);
};

export default PageNumberNavigator;
