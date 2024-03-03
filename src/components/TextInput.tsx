interface TextInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	placeholder?: string;
	defaultValue?: string;
	isEditable?: boolean;
}

/**
 * @param label - The label for the input (required)
 * @param name - The name of the input (required)
 * @param ariaLabel - The aria-label for the input (required)
 * @param placeholder - The placeholder for the input (optional)
 * @param defaultValue - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @returns A text input with a label
 */

const TextInput: React.FC<TextInputProps> = ({
	label,
	name,
	ariaLabel,
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
				<input
					type="text"
					name={name}
					aria-label={ariaLabel}
					placeholder={placeholder ?? ""}
					defaultValue={defaultValue ?? ""}
					className="bg-inherit w-full"
					disabled={!isEditable}
				/>
			</span>
		</label>
	);
};

export default TextInput;
