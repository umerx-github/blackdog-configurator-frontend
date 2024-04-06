interface RadioInputProps {
	name: string;
	value: string;
	label: string;
	isChecked: boolean;
	isEditable?: boolean;
	handleValueSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
	name,
	value,
	label,
	isChecked,
	isEditable = false,
	handleValueSelection,
}) => {
	return (
		<label className="flex items-center">
			<input
				type="radio"
				name={name}
				value={value}
				checked={isChecked}
				disabled={!isEditable}
				onChange={handleValueSelection}
				className="mr-2"
			/>
			<span>{label}</span>
		</label>
	);
};

export default RadioInput;
