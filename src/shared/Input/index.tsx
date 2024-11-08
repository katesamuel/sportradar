import React from "react";
import "./index.css";

interface InputBoxProps {
  value: string | number;
  onChange: (value: any) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  required?: boolean;
}

const Input: React.FC<InputBoxProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  className = "",
  ariaLabel,
  required = true,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // If the type is 'number', convert the value to number
        if (type === 'number') {
          const numericValue: any = inputValue === '' ? '' : Number(inputValue);
          // Only update the state if the value is a valid number or an empty string
          if (!isNaN(numericValue)) {
            onChange(numericValue);
          }
        } else {
          // For 'text', simply pass the string value
          onChange(inputValue);
        }
      };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`shared-input ${className}`}
      aria-label={ariaLabel}
      required={required}
    />
  );
};

export default Input;
