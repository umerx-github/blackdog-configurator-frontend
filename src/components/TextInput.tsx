import { forwardRef } from "react";
interface TextInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	id?: string;
	placeholder?: string;
	defaultValue?: string | null;
	value?: string | null;
	isEditable?: boolean;
	error?: string;
	onChange?: (value: string) => void;
}

/**
 * @param label - The label for the input (required)
 * @param name - The name of the input (required)
 * @param ariaLabel - The aria-label for the input (required)
 * @param id - The id for the input (optional)
 * @param placeholder - The placeholder for the input (optional)
 * @param defaultValue - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @param error - The error message for the input (optional)
 * @param onChange - The function to call when the input changes (optional)
 * @returns A text input with a label
 */

const TextInput = forwardRef<HTMLInputElement | null, TextInputProps>(function (
	{
		label,
		name,
		ariaLabel,
		placeholder,
		error,
		value = null,
		defaultValue = null,
		isEditable = false,
		onChange: onChange = () => {},
	},
	ref
) {
	return (
		<label className="flex flex-col">
			<span
				className={`text-zinc-500 dark:text-zinc-400 text-sm ${
					isEditable ? "mb-2" : ""
				}`}
			>
				{label}
			</span>
			<span
				className={`${
					isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""
				}`}
			>
				{error ? <p>{error}</p> : null}
				{undefined === value ? (
					<input
						type="text"
						name={name}
						aria-label={ariaLabel}
						placeholder={placeholder ?? ""}
						defaultValue={defaultValue ?? ""}
						className={`bg-inherit w-full focus:outline-zinc-400 focus:outline-dashed focus:outline-offset-2 ${
							isEditable ? "p-2" : ""
						}`}
						disabled={!isEditable}
						ref={ref}
						onChange={(e) => onChange(e.target.value)}
					/>
				) : (
					<input
						type="text"
						name={name}
						aria-label={ariaLabel}
						placeholder={placeholder ?? ""}
						value={value ?? defaultValue ?? ""}
						className={`bg-inherit w-full focus:outline-zinc-400 focus:outline-dashed focus:outline-offset-2 ${
							isEditable ? "p-2" : ""
						}`}
						disabled={!isEditable}
						ref={ref}
						onChange={(e) => onChange(e.target.value)}
					/>
				)}
			</span>
		</label>
	);
});

export default TextInput;
