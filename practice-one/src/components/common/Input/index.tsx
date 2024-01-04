import { ChangeEventHandler, forwardRef } from "react";
import "./Input.css";
import { Variant } from "../../../types/variant";

type CustomInputProps = {
  placeholder?: string;
  className?: string;
  type: string;
  name?: string;
  value?: string;
  variant?: Variant;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ placeholder, className, value, name, type, variant = Variant.DEFAULT, onChange }, ref) => (
    <input
      className={`${className} input input-${variant}`}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      ref={ref} 
    />
  )
);

export default Input;
