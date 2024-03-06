// react
import React, { ChangeEventHandler, forwardRef } from "react";

// css
import "./Input.css";

// type
import { Variant } from "@type/variant";

type CustomInputProps = {
  placeholder?: string;
  className?: string;
  type: string;
  name: string;
  value: string | number;
  variant?: Variant;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string | null;
  disabled?: boolean;
};

const Input = React.memo (forwardRef<HTMLInputElement, CustomInputProps>(
  ({ placeholder, className, value, name, type, variant = Variant, onChange, error, disabled }, ref) => {
    const inputClassName = `${className} input ${variant} ${error ? "error" : ""}`;

    return (
      <div className="input-container">
        <input
          className={inputClassName}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
));

export default Input;
