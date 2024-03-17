import React, { useEffect, useState } from "react";
import CurrencyInputComponent from "react-currency-input-field";
import { bankersRounding, bankersRoundingTruncateToInt } from "../utils";

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
	max = Number.MAX_SAFE_INTEGER,
	min = Number.MIN_SAFE_INTEGER,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [stringValue, setStringValue] = useState<string | null>(
		defaultValueInCents !== undefined
			? bankersRounding(defaultValueInCents / 100).toString()
			: null
	);
	useEffect(() => {
		if (undefined !== defaultValueInCents) {
			setStringValue(
				bankersRounding(defaultValueInCents / 100).toString()
			);
		} else {
			setStringValue(null);
		}
	}, [defaultValueInCents]);
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
					isFocused
						? "outline-zinc-400 outline-dashed outline-offset-2"
						: ""
				} ${isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
			>
				<span className="ml-2">$</span>
				<CurrencyInputComponent
					type="currency"
					name={name}
					decimalsLimit={2}
					allowDecimals={true}
					aria-label={ariaLabel}
					placeholder={placeholder}
					value={stringValue ?? ""}
					className={`bg-inherit outline-none ${
						isEditable ? "p-2 pl-1" : ""
					}`}
					disabled={!isEditable}
					onValueChange={(value) => {
						const valueIntOrNull =
							value === undefined
								? null
								: bankersRoundingTruncateToInt(
										parseFloat(value) * 100
								  );
						if (valueIntOrNull === null) {
							setStringValue(null);
							onChange(null);
							return;
						}
						if (valueIntOrNull <= max && valueIntOrNull >= min) {
							setStringValue(value ?? null);
							onChange(valueIntOrNull);
						}
					}}
					onBlur={() => setIsFocused(false)}
					onFocus={() => setIsFocused(true)}
				/>
			</span>
		</label>
	);
};

export default CurrencyInput;
