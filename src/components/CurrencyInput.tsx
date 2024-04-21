import React, { useEffect, useState } from "react";
import { bankersRounding, bankersRoundingTruncateToInt } from "../utils";
import NumericInput from "./inputs-and-outputs/inputs/NumericInput.js";

interface CurrencyInputProps {
	label: string;
	name: string;
	ariaLabel?: string;
	placeholder?: string;
	valueInCents?: number;
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
 * @param value - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @returns A text input with a label
 */

const CurrencyInput: React.FC<CurrencyInputProps> = ({
	label,
	name,
	ariaLabel,
	placeholder,
	valueInCents,
	isEditable = false,
	onChange = () => {},
	precision,
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
			>
				<div
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				>
					<span className={isEditable ? "ml-1" : "mr-1"}>$</span>
					<NumericInput
						name={name}
						precision={precision}
						scale={2}
						aria-label={ariaLabel}
						placeholder={placeholder}
						value={
							valueInCents !== undefined
								? bankersRounding(valueInCents / 100)
								: null
						}
						className={`bg-inherit outline-none ${
							isEditable ? "p-2" : ""
						}`}
						disabled={!isEditable}
						onChange={(value) => {
							const valueIntOrNull =
								value !== null
									? bankersRoundingTruncateToInt(value * 100)
									: null;
							onChange(valueIntOrNull);
						}}
					/>
				</div>
			</span>
		</label>
	);
};

export default CurrencyInput;
