import React from "react";
import "./index.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ariaLabel = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`shared-button ${className}`}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
};

export default Button;
