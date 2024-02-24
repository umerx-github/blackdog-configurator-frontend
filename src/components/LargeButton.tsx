import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LargeButtonProps {
	icon: IconProp;
	text: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({ icon, text }) => {
	return (
		<div className="blackdog-lg-btn h-32 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center transition-bg duration-1000">
			<div className="text-2xl font-bold flex flex-col items-center justify-center">
				<FontAwesomeIcon
					icon={icon}
					className="text-4xl text-zinc-600 dark:text-zinc-400"
				/>
				<h3 className="font-extralight text-zinc-900 dark:text-white">
					{text}
				</h3>
			</div>
		</div>
	);
};

export default LargeButton;
