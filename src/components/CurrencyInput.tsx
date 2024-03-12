import React, { forwardRef, useState } from "react";
import NumericInput from "react-numeric-input";

interface CurrencyInputProps {
	label: string;
	name: string;
	ariaLabel?: string | null;
	placeholder?: string | null;
	defaultValue?: string | null;
	value?: string | number | undefined;
	isEditable?: boolean;
	onChange?: (
		value: number | null,
		stringValue: string,
		input: HTMLInputElement
	) => void;
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

export const formatStringFloatValue = (
	inputValue: string,
	scale: number = 2
): string | null => {
	const endsWithPeriod = inputValue.endsWith(".");
	const numberOfPeriods = inputValue.split(".").length - 1;
	let floatVal = parseFloat(inputValue);
	if (isNaN(floatVal)) {
		return null;
	}
	return (
		Number(floatVal.toFixed(scale)).toString() +
		(endsWithPeriod && 1 === numberOfPeriods ? "." : "")
	);
};

export const formatStringFloatValueDropPeriod = (
	inputValue: string,
	scale: number = 2
): number | null => {
	// const endsWithPeriod = inputValue.endsWith(".");
	// const numberOfPeriods = inputValue.split(".").length - 1;
	let floatVal = parseFloat(inputValue);
	if (isNaN(floatVal)) {
		return null;
	}
	return Number(floatVal.toFixed(scale));
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
	label,
	name,
	ariaLabel = null,
	placeholder = null,
	defaultValue = null,
	isEditable = false,
	onChange = () => {},
	value,
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
					isFocused
						? "outline-zinc-400 outline-dashed outline-offset-2"
						: ""
				} ${isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
			>
				<span className="ml-2">$</span>
				<NumericInput
					type="currency"
					precision={2}
					value={value}
					format={(num) => {
						if (num === null) {
							return "";
						}
						const value = formatStringFloatValue(num.toString());
						return value ?? "";
					}}
					parse={(numString) => {
						// Remove the period and convert to an integer
						// return parseInt(numString.replace(".", ""));
						const value = formatStringFloatValueDropPeriod(
							numString,
							2
						);
						console.log({ value });
						return value;
					}}
					name={name}
					aria-label={ariaLabel ?? ""}
					placeholder={placeholder ?? ""}
					defaultValue={defaultValue ?? ""}
					className={`bg-inherit outline-none ${
						isEditable ? "p-2 pl-1" : ""
					}`}
					disabled={!isEditable}
					onChange={onChange}
					onBlur={() => setIsFocused(false)}
					onFocus={() => setIsFocused(true)}
				/>
			</span>
		</label>
	);
};

export default CurrencyInput;
