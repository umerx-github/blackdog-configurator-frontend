import { useEffect, useState } from "react";

export const formatStringFloatValue = (
	inputValue: string,
	scale: number = 2
): string => {
	const endsWithPeriod = inputValue.endsWith(".");
	const numberOfPeriods = inputValue.split(".").length - 1;
	let floatVal = parseFloat(inputValue);
	if (isNaN(floatVal)) {
		floatVal = 0;
	}
	return (
		Number(floatVal.toFixed(scale)).toString() +
		(endsWithPeriod && 1 === numberOfPeriods ? "." : "")
	);
};

export const formatStringFloatValueDropPeriod = (
	inputValue: string,
	scale: number = 2
): string => {
	// const endsWithPeriod = inputValue.endsWith(".");
	// const numberOfPeriods = inputValue.split(".").length - 1;
	let floatVal = parseFloat(inputValue);
	if (isNaN(floatVal)) {
		floatVal = 0;
	}
	return Number(floatVal.toFixed(scale)).toString();
};

/**
 *
 * This a component that makes sure the value passed to onChange is always a valid float.
 * It uses an internal state to keep track of the value, and only calls onChange when the value is valid.
 */
export default function FloatInput({
	name,
	value,
	title = "",
	precision = 8,
	scale = 2,
	timeoutMilliseconds = 350,
	onChange = () => {},
}: {
	name: string;
	value: string;
	title?: string;
	precision?: number;
	scale?: number;
	timeoutMilliseconds?: number;
	onChange?: (value: string) => void;
}) {
	const [internalValue, setInternalValue] = useState(
		formatStringFloatValue(value, scale)
	);
	const [valueChangeTimeout, setValueChangeTimeout] =
		useState<NodeJS.Timeout>();
	useEffect(() => {
		setInternalValue(formatStringFloatValue(value, scale));
	}, [value]);
	return (
		<input
			type="text"
			name={name}
			pattern={`[0-9]*[.]?[0-9]{0,${scale}}`}
			title={title}
			value={internalValue}
			onChange={(e) => {
				const periodCount = e.target.value.split(".").length - 1;
				if (e.target.value.length > precision && periodCount !== 1) {
					return;
				}
				if (e.target.value.length > precision + 2) {
					return;
				}
				const newValue = e.target.value;
				setInternalValue(newValue);
				clearTimeout(valueChangeTimeout);
				// queue up a new timeout to round the value to 2 decimal places
				setValueChangeTimeout(
					setTimeout(() => {
						const cleanNewValue = formatStringFloatValue(
							newValue,
							scale
						);
						setInternalValue(cleanNewValue);
						onChange(
							formatStringFloatValueDropPeriod(
								cleanNewValue,
								scale
							)
						);
					}, timeoutMilliseconds)
				);
			}}
			// @todo - may need to be careful this doesn't cause some kind of loop
			onBlur={(e) => {
				const cleanNewValue = formatStringFloatValue(
					e.target.value,
					scale
				);
				setInternalValue(cleanNewValue);
				onChange(
					formatStringFloatValueDropPeriod(cleanNewValue, scale)
				);
			}}
		></input>
	);
}
