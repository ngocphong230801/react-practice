import "./Input.css";
import { Variant } from "../../../types/variant";

import React, { ChangeEventHandler} from "react";

type CustomInputProps = {
  placeholder?: string;
  className?: string;
  type: string;
  name?: string;
  value?: string;
  variant?: Variant;
  ref?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<CustomInputProps> = ({
  placeholder,
  className,
  value,
  name,
  variant = Variant.DEFAULT,
  ref,
  onChange,
}) =>
   (
    <input
      className={`${className} input input-${variant}`}
      type="text"
      placeholder={placeholder}
      value={value}
      ref={ref}
      name={name}
      onChange={onChange}
    />
  );

export default Input;
