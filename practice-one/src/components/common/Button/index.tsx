import "./Button.css"
import React, { MouseEventHandler, ReactNode } from "react";
import { Variant } from "../../../types/variant";

type CustomBtnProps = {
    className?: string;
    children: ReactNode;
    variant?: Variant;
    disabled?: boolean;
    loading?: boolean;
    buttonType?: "button" | "submit" | "reset";
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<CustomBtnProps> = ({
    className,
    onClick,
    disabled,
    variant = Variant.DEFAULT,
    children,
    loading,
    buttonType = "button",
}) => (
    <button type={buttonType} className={`${className} btn btn-${variant}`} onClick={onClick} disabled={disabled || loading}>
        {loading ? "Loading..." : children}
    </button>
);

export default Button
