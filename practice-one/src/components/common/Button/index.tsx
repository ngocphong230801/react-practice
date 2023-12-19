import "./Button.css"
import React, { MouseEventHandler, ReactNode } from "react";
import { Variant } from "../../../types/variant";

type CustomBtnProps = {
    className?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    title?: string;
    variant?: Variant;
    disabled?: boolean;
    loading?: boolean;
    buttonType?: "button" | "submit" | "reset";
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<CustomBtnProps> = ({
    className,
    onClick,
    title,
    disabled,
    variant = Variant.DEFAULT,
    iconLeft,
    iconRight,
    loading,
    buttonType = "button",
}) => (
    <button type={buttonType} className={`${className} btn btn-${variant}`} onClick={onClick} disabled={disabled || loading}>
        {loading ? "Loading..." : <>{iconLeft}{title}{iconRight}</> } 
    </button>
);

export default Button
