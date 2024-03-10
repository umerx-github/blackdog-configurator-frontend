import { forwardRef } from "react";

interface DropdownInputProps {
	label: string;
	options: string[];
	placeholder?: string;
	defaultValue?: string | null;
	isEditable?: boolean;
}

/**
 * @param label - The label for the input (required)
 * @param options - The options for the dropdown (required)
 * @param defaultValue - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @returns A text input with a label
 */

const DropdownInput = forwardRef<HTMLSelectElement | null, DropdownInputProps>(
	function (
		{ label, options, defaultValue = null, isEditable = false },
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
					className={`w-full h-full ${
						isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""
					}`}
				>
					{isEditable ? (
						<select
							ref={ref}
							defaultValue={defaultValue ?? ""}
							disabled={!isEditable}
							className={`bg-inherit w-full focus:outline-zinc-400 focus:outline-dashed focus:outline-offset-2 ${
								isEditable ? "p-2" : ""
							}`}
						>
							{options.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					) : (
						<span>{defaultValue ?? ""}</span>
					)}
				</span>
			</label>
		);
	}
);

export default DropdownInput;
