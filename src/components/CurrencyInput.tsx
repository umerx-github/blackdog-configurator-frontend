import React, { useEffect, useState } from "react";
import { bankersRounding, bankersRoundingTruncateToInt } from "../utils";
import NumericInput from "./inputs-and-outputs/inputs/NumericInput.js";

interface CurrencyInputProps {
	label: string;
	name: string;
	ariaLabel?: string;
	placeholder?: string;
	defaultValueInCents?: number;
	isEditable?: boolean;
	onChange?: (valueInCents: number | null) => void;
	max?: number;
	min?: number;
	precision?: number;
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

const CurrencyInput: React.FC<CurrencyInputProps> = ({
	label,
	name,
	ariaLabel,
	placeholder,
	defaultValueInCents,
	isEditable = false,
	onChange = () => {},
	precision,
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
			<span
				className={`w-full ${
					isEditable
						? "outline-zinc-400 outline-dashed outline-offset-2"
						: ""
				} ${isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
			>
				<span className="ml-2">$</span>
				<NumericInput
					name={name}
					precision={precision}
					scale={2}
					aria-label={ariaLabel}
					placeholder={placeholder}
					defaultValue={
						defaultValueInCents !== undefined
							? bankersRounding(defaultValueInCents / 100)
							: null
					}
					className={`bg-inherit outline-none ${
						isEditable ? "p-2 pl-1" : ""
					}`}
					disabled={!isEditable}
					onChange={(value) => {
						const valueIntOrNull =
							value !== null
								? bankersRoundingTruncateToInt(value * 100)
								: null;
						onChange(valueIntOrNull);
					}}
				></NumericInput>
			</span>
		</label>
	);
};

export default CurrencyInput;
