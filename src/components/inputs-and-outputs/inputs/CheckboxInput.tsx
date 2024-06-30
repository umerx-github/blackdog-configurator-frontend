import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CheckboxInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	checked: boolean;
	id: string;
	placeholder?: string;
	isEditable?: boolean;
	error?: string;
	onChange?: (value: boolean) => void;
}

/**
 * @param label - The label for the input (required)
 * @param name - The name of the input (required)
 * @param ariaLabel - The aria-label for the input (required)
 * @param checked - The default value for the input (required)
 * @param id - The id for the input (required)
 * @param placeholder - The placeholder for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @param error - The error message for the input (optional)
 * @param onChange - The function to call when the input changes (optional)
 * @returns A text input with a label
 */

const CheckboxInput: React.FC<CheckboxInputProps> = ({
	label,
	name,
	ariaLabel,
	checked,
	id,
	placeholder,
	isEditable = false,
	error,
	onChange = () => {},
}) => {
	const toggleCheckbox = () => {
		onChange(!checked);
	};

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
				className={`flex items-center h-[40px] text-center ${
					isEditable ? "" : ""
				}`}
			>
				{error ? <p>{error}</p> : null}
				<span
					className="border h-6 w-6 flex justify-center items-center"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.code === "Space") {
							toggleCheckbox();
						}
					}}
				>
					<input
						type="checkbox"
						name={name}
						aria-label={ariaLabel}
						checked={checked}
						onChange={toggleCheckbox}
						hidden
						id={id}
						placeholder={placeholder ?? ""}
						className={`bg-inherit ${isEditable ? "p-2" : ""}`}
						disabled={!isEditable}
					/>
					<label htmlFor={id} className="">
						{checked && (
							<span className="checkmark">
								<i className="">
									<FontAwesomeIcon
										icon={faCheck}
										className="text-sm transition-bg duration-1000"
									/>
								</i>
							</span>
						)}
					</label>
				</span>
			</span>
		</label>
	);
};

export default CheckboxInput;
