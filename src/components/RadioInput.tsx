import { useState } from "react";

interface RadioInputProps {
	name: string;
	value: string;
	label: string;
	selectedValue?: string;
	isEditable?: boolean;
	handleValueSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
	name,
	value,
	label,
	selectedValue,
	isEditable = false,
	handleValueSelection,
}) => {
	const handleClick = () => {
		if (isEditable) {
			handleValueSelection({
				target: {
					value,
					checked: selectedValue === value,
				},
			} as React.ChangeEvent<HTMLInputElement>);
		}
	};

	return (
		<>
			<input
				type="radio"
				name={name}
				value={value}
				disabled={!isEditable}
				className="mr-2"
				hidden
			/>
			<label
				className="radio-label flex items-center"
				onClick={handleClick}
			>
				<span
					className={`radio-btn w-4 h-4 hover:bg-gray-300 dark:hover:bg-gray-600 ${
						selectedValue === value ? "bg-gray-900" : "bg-gray-200"
					}`}
				></span>
				{label}
			</label>
		</>
	);
};

export default RadioInput;
