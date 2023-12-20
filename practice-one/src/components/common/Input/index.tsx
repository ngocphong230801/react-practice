import "./Input.css";
import { Variant } from "../../../types/variant";

import React, { ChangeEventHandler } from "react";

type CustomInputProps = {
  placeholder?: string;
  className?: string;
  type: string;
  name?: string;
  value?: string;
  variant?: Variant;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<CustomInputProps> = ({
  placeholder,
  className,
  value,
  name,
  variant = Variant.DEFAULT,
  onChange,
}) =>
   (
    <input
      className={`${className} input input-${variant}`}
      type="text"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );

export default Input;
