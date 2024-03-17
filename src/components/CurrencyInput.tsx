import React, { useState } from "react";
import CurrencyInputComponent, {
	CurrencyInputOnChangeValues,
} from "react-currency-input-field";

interface CurrencyInputProps {
	label: string;
	name: string;
	ariaLabel?: string | null;
	placeholder?: string | null;
	defaultValue?: string | null;
	value?: string | number | undefined;
	isEditable?: boolean;
	onChange?: (
		value: string | undefined,
		name?: string | undefined,
		values?: CurrencyInputOnChangeValues | undefined
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
				<CurrencyInputComponent
					type="currency"
					value={value}
					name={name}
					decimalsLimit={2}
					allowDecimals={true}
					aria-label={ariaLabel ?? ""}
					placeholder={placeholder ?? ""}
					defaultValue={defaultValue ?? ""}
					className={`bg-inherit outline-none ${
						isEditable ? "p-2 pl-1" : ""
					}`}
					disabled={!isEditable}
					onValueChange={onChange}
					onBlur={() => setIsFocused(false)}
					onFocus={() => setIsFocused(true)}
				/>
			</span>
		</label>
	);
};

export default CurrencyInput;
