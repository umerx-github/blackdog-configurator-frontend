import React from "react";

interface NumericInputProps {
	name?: string;
	ariaLabel?: string;
	id?: string;
	placeholder?: string;
	defaultValue?: number | null;
	onChange?: (value: number | null) => void;
	onInvalid?: (value: string) => void;
	precision?: number;
	scale?: number;
	className?: string;
	disabled?: boolean;
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
const NumericInput: React.FC<NumericInputProps> = ({
	name,
	ariaLabel,
	id,
	placeholder,
	defaultValue = null,
	onChange = () => {},
	onInvalid = () => {},
	precision = null,
	scale = null,
	className,
	disabled,
}) => {
	const [internalValue, setInternalValue] = React.useState<string | null>(
		defaultValue?.toString() ?? null
	);
	function internallyValid(rawValue: string): boolean {
		const validNumberOrInProgress = /^[\d]*\.?[\d]*$/;
		if (!validNumberOrInProgress.test(rawValue)) {
			return false;
		}
		if (precision !== null) {
			// Strip the period from the string
			const periodIndex = rawValue.indexOf(".");
			const valueWithoutPeriod =
				periodIndex === -1
					? rawValue
					: rawValue.slice(0, periodIndex) +
					  rawValue.slice(periodIndex + 1);
			// Confirm the length of the string is less than or equal to the precision
			if (valueWithoutPeriod.length > precision) {
				return false;
			}
		}
		if (scale !== null) {
			const periodIndex = rawValue.indexOf(".");
			if (periodIndex !== -1) {
				const valueAfterPeriod = rawValue.slice(periodIndex + 1);
				if (valueAfterPeriod.length > scale) {
					return false;
				}
			}
		}
		return true;
	}
	function externallyValid(rawValue: string): boolean {
		if (!internallyValid(rawValue)) {
			return false;
		}
		const periodIsLastCharacter = rawValue.slice(-1) === ".";
		if (periodIsLastCharacter) {
			return false;
		}
		return true;
	}
	function parseToExternalValue(rawValue: string): number | null {
		if (scale === 0) {
			return parseInt(rawValue);
		}
		return parseFloat(rawValue);
	}
	return (
		<input
			className={className}
			type="number"
			name={name}
			aria-label={ariaLabel}
			id={id ?? ""}
			placeholder={placeholder}
			value={internalValue?.toString()}
			disabled={disabled}
			onChange={(e) => {
				const rawValue = e.target.value;
				if (internallyValid(rawValue)) {
					setInternalValue(rawValue);
				}
				if (externallyValid(rawValue)) {
					onChange(parseToExternalValue(rawValue));
				} else {
					onInvalid(rawValue);
				}
			}}
			step="any"
			// onBlur={(e) => {
			// 	const rawValue = e.target.value;
			// 	if (externallyValid(rawValue)) {
			// 		setInternalValue(rawValue);
			// 	} else {
			// 		onInvalid(rawValue);
			// 	}
			// }}
		/>
	);
};

export default NumericInput;
