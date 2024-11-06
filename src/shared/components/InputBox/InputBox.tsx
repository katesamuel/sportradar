import React from 'react';

interface InputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ value, onChange, placeholder = 'Enter text' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label="input-box"
    />
  );
};

export default InputBox;
