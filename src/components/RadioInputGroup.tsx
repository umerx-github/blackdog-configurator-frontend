import { useState } from "react";
import RadioInput from "./inputs-and-outputs/inputs/RadioInput";

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
		setCurrentValue(e.target.value);
		onChange(e.target.value);
	};

	return (
		<>
			{inputs.map((input) => (
				<RadioInput
					key={input.value}
					name={name}
					value={input.value}
					label={input.label}
					isEditable={isEditable}
					selectedValue={currentValue}
					handleValueSelection={handleValueSelection}
				/>
			))}
		</>
	);
};

export default RadioInputGroup;
