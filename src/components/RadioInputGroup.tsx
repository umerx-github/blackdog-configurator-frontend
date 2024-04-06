import { useState } from "react";
import RadioInput from "./RadioInput";

interface RadioInputGroupProps {
	name: string;
	inputs: RadioInputDetails[];
	defaultValue?: string;
	isEditable?: boolean;
	onChange?: (value: string) => void;
}

interface RadioInputDetails {
	value: string;
	label: string;
	isDefaultChecked?: boolean;
}

/**
 * @param name - The name of the radio input (required)
 * @param inputs - The radio inputs to display (required)
 * @param defaultValue - The default value of the radio input (optional)
 * @param isEditable - Whether the radio input is editable (optional). Defaults to false.
 * @param onChange - The function to call when the radio input changes (optional)
 * @returns A radio input group
 */

const RadioInputGroup: React.FC<RadioInputGroupProps> = ({
	name,
	inputs,
	defaultValue = "",
	isEditable = false,
	onChange = () => {},
}) => {
	const [currentValue, setCurrentValue] = useState<string | undefined>(
		defaultValue
	);
	const handleValueSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setCurrentValue(e.target.value);
			onChange(e.target.value);
		}
	};

	return (
		<>
			{console.log(currentValue)}
			{inputs.map((input) => (
				<RadioInput
					key={input.value}
					name={name}
					value={input.value}
					label={input.label}
					isChecked={input.value === currentValue}
					isEditable={isEditable}
					handleValueSelection={handleValueSelection}
				/>
			))}
		</>
	);
};

export default RadioInputGroup;
