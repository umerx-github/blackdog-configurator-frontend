import React, { useState } from "react";
import NumericInput from "../components/inputs-and-outputs/inputs/NumericInput.js";
interface NumberInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	id?: string;
	placeholder?: string;
	value?: number | null;
	isEditable?: boolean;
	isPercentage?: boolean;
	error?: string;
	onChange?: (value: number | null) => void;
	precision?: number;
	scale?: number;
}

/**
 * @param label - The label for the input (required)
 * @param name - The name of the input (required)
 * @param ariaLabel - The aria-label for the input (required)
 * @param id - The id for the input (optional)
 * @param placeholder - The placeholder for the input (optional)
 * @param value - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @param isPercentage - Whether the input is a percentage (optional). Defaults to false.
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
	value = null,
	isEditable = false,
	isPercentage = false,
	error,
	onChange = () => {},
	precision,
	scale,
}) => {
	const [isFocused, setIsFocused] = useState(false);

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
				className={`w-full ${
					isEditable
						? `bg-zinc-100 dark:bg-zinc-800 ${
								isFocused
									? "outline-zinc-400 outline-dashed outline-offset-2"
									: null
						  }`
						: null
				}`}
				style={{ width: `${isPercentage ? "6.5rem" : null}` }}
			>
				{error ? <p>{error}</p> : null}
				<div
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				>
					<NumericInput
						precision={precision}
						scale={scale}
						name={name}
						aria-label={ariaLabel}
						id={id}
						placeholder={placeholder}
						value={value}
						className={`bg-inherit outline-none ${
							isPercentage ? "w-20" : null
						} ${isEditable ? "p-2" : ""}`}
						disabled={!isEditable}
						onChange={onChange}
					/>
					{isPercentage ? <span className="mr-2">%</span> : null}
				</div>
			</span>
		</label>
	);
};

export default NumberInput;
