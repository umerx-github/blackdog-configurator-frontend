interface DropdownInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	options: string[];
	placeholder?: string;
	defaultValue?: string;
	isEditable?: boolean;
}

/**
 * @param label - The label for the input (required)
 * @param name - The name of the input (required)
 * @param ariaLabel - The aria-label for the input (required)
 * @param options - The options for the dropdown (required)
 * @param placeholder - The placeholder for the input (optional)
 * @param defaultValue - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @returns A text input with a label
 */

const DropdownInput: React.FC<DropdownInputProps> = ({
	label,
	name,
	ariaLabel,
	options,
	placeholder,
	defaultValue,
	isEditable = false,
}) => {
	return (
		<label className="flex flex-col">
			<span
				className={`text-zinc-500 dark:text-zinc-400 text-sm ${
					isEditable ? "mb-2" : ""
				}`}
			>
				{label}
			</span>
			<span className="">
				{isEditable ? (
					<select
						defaultValue={defaultValue}
						disabled={!isEditable}
						className="bg-inherit"
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				) : (
					<span>{defaultValue}</span>
				)}
			</span>
		</label>
	);
};

export default DropdownInput;
