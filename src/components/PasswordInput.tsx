import React, { useState, forwardRef, useEffect } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PasswordInputProps {
	label: string;
	name: string;
	ariaLabel: string;
	id?: string;
	defaultValue?: string;
	isEditable?: boolean;
	error?: string;
	OnChange?: (value: string) => void;
}

/**
 * @param label - The label for the input (required)
 * @param name - The name of the input (required)
 * @param ariaLabel - The aria-label for the input (required)
 * @param id - The id for the input (optional)
 * @param defaultValue - The default value for the input (optional)
 * @param isEditable - Whether the input is editable (optional)
 * @param error - The error message for the input (optional)
 * @param onChange - The function to call when the input changes (optional)
 * @returns A text input with a label
 */

const PasswordInput = forwardRef<HTMLInputElement | null, PasswordInputProps>(
	function (
		{
			label,
			name,
			ariaLabel,
			id = "",
			defaultValue = "",
			isEditable = false,
			error,
			OnChange = () => {},
		},
		ref
	) {
		const handleValueUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
			OnChange(e.target.value);
		};
		const [showPassword, setShowPassword] = useState(false);
		function toggleShowPassword(e: React.MouseEvent<HTMLButtonElement>) {
			e.preventDefault();
			setShowPassword(!showPassword);
		}
		// Reset the password visibility when the input is no longer editable
		useEffect(() => {
			setShowPassword(false);
		}, [isEditable]);

		return (
			<label className="flex flex-col" id={id}>
				<span
					className={`text-zinc-500 dark:text-zinc-400 text-sm ${
						isEditable ? "mb-2" : ""
					}`}
				>
					{label}
				</span>
				<span
					className={`flex ${
						isEditable ? "bg-zinc-100 dark:bg-zinc-800" : ""
					}`}
				>
					{error ? <p>{error}</p> : null}
					<input
						type={showPassword ? "text" : "password"}
						name={name}
						aria-label={ariaLabel}
						className={`bg-inherit w-full focus:outline-zinc-400 focus:outline-dashed focus:outline-offset-2 ${
							isEditable ? "p-2" : ""
						}`}
						defaultValue={defaultValue}
						disabled={!isEditable}
						ref={ref}
						onChange={handleValueUpdate}
					/>
					<button onClick={toggleShowPassword} className="pr-2">
						{showPassword ? (
							<FontAwesomeIcon icon={faEye} />
						) : (
							<FontAwesomeIcon icon={faEyeSlash} />
						)}
					</button>
				</span>
			</label>
		);
	}
);

export default PasswordInput;
