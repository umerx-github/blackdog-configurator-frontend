import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CopyButtonProps {
	text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(() => {
			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		});
	};

	return (
		<button
			className="text-zinc-500 dark:text-zinc-400 text-lg"
			onClick={handleCopy}
		>
			{isCopied ? (
				<div
					className="absolute p-2 z-10"
					style={{
						transform: "translate(-65%, -30%)",
					}}
				>
					<FontAwesomeIcon icon={faCheck} />
					<div className="text-xs">Copied!</div>
				</div>
			) : (
				<FontAwesomeIcon icon={faClipboard} />
			)}
		</button>
	);
};

export default CopyButton;
