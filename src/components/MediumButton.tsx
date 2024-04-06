import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MediumButtonProps {
	icon: IconProp;
	text: string;
}

const MediumButton: React.FC<MediumButtonProps> = ({ icon, text }) => {
	return (
		<div className="blackdog-md-btn h-20 border-2 border-zinc-400 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center transition-bg duration-1000">
			<div className="text-md font-bold flex flex-col items-center justify-center">
				<FontAwesomeIcon
					icon={icon}
					className="text-2xl text-zinc-600 dark:text-zinc-400"
				/>
				<h4 className="font-extralight text-zinc-900 dark:text-white">
					{text}
				</h4>
			</div>
		</div>
	);
};

export default MediumButton;
