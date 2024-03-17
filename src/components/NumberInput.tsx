import React, { useState } from "react";

interface NumberInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	id?: string;
	placeholder?: number;
	defaultValue?: number | null;
	isEditable?: boolean;
	error?: string;
	onChange?: (value: number | null) => void;
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

const NumberInput: React.FC<NumberInputProps> = ({
	label,
	name,
	ariaLabel,
	id,
	placeholder,
	defaultValue = null,
	isEditable = false,
	error,
	onChange = () => {},
}) => {
	const handleValueUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (
			e.target.value === "" ||
			e.target.value === null ||
			isNaN(Number(e.target.value))
		) {
			onChange(null);
			return;
		}
		onChange(Number(e.target.value));
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
				className={`${
					isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""
				}`}
			>
				{error ? <p>{error}</p> : null}
				<input
					type="number"
					name={name}
					aria-label={ariaLabel}
					id={id ?? ""}
					placeholder={placeholder?.toString() ?? ""}
					defaultValue={defaultValue?.toString() ?? ""}
					className={`bg-inherit focus:outline-zinc-400 focus:outline-dashed focus:outline-offset-2 w-full ${
						isEditable ? "p-2 pl-1" : ""
					}`}
					disabled={!isEditable}
					step={undefined}
					onChange={handleValueUpdate}
				/>
			</span>
		</label>
	);
};

export default NumberInput;
