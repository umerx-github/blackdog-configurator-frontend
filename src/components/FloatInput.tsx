import { useEffect, useState } from "react";

export const formatStringFloatValue = (inputValue: string): string => {
	const endsWithPeriod = inputValue.endsWith(".");
	const numberOfPeriods = inputValue.split(".").length - 1;
	let floatVal = parseFloat(inputValue);
	if (isNaN(floatVal)) {
		floatVal = 0;
	}
	return (
		Number(floatVal.toFixed(2)).toString() +
		(endsWithPeriod && 1 === numberOfPeriods ? "." : "")
	);
};

export default function FloatInput({
	name,
	value,
	onChange,
}: {
	name: string;
	value: string;
	onChange: (value: string) => void;
}) {
	// const [internalValue, setInternalValue] = useState(
	// 	formatStringFloatValue(value)
	// );
	const [valueChangeTimeout, setValueChangeTimeout] =
		useState<NodeJS.Timeout>();
	// useEffect(() => {
	// 	setInternalValue(formatStringFloatValue(value));
	// }, [value]);
	return (
		<input
			type="text"
			name={name}
			pattern="[0-9]*[.]?[0-9]{0,2}"
			title="Enter a valid number with up to 2 decimal places."
			value={value}
			onChange={(e) => {
				const periodCount = e.target.value.split(".").length - 1;
				// Don't allow more than 8 numbers - decimal doesn't count
				if (
					e.target.value.length > 9 ||
					(periodCount !== 1 && e.target.value.length > 8)
				) {
					return;
				}
				const newValue = e.target.value;
				onChange(newValue);
				// setInternalValue(newValue);
				clearTimeout(valueChangeTimeout);
				// queue up a new timeout to round the value to 2 decimal places
				setValueChangeTimeout(
					setTimeout(() => {
						const cleanNewValue = formatStringFloatValue(newValue);
						// setInternalValue(cleanNewValue);
						onChange(cleanNewValue);
					}, 350)
				);
			}}
			// @todo - may need to be careful this doesn't cause some kind of loop
			onBlur={(e) => {
				const cleanNewValue = formatStringFloatValue(e.target.value);
				// setInternalValue(cleanNewValue);
				onChange(cleanNewValue);
			}}
		></input>
	);
}
