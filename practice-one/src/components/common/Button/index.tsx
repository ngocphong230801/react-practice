import "./Button.css"
import React, {MouseEventHandler, ReactNode} from "react";
import { Variant } from "../../../types/variant";

type CustomBtnProps = {
    className?: string;
    children: ReactNode;
    variant?:Variant;
    onClick: MouseEventHandler<HTMLButtonElement>;
};
const Button : React.FC<CustomBtnProps> = ({
    className,
    onClick,
    variant = Variant.DEFAULT,
    children,
}) : React.ReactElement => {
    return(
        <button className={`${className} btn btn-${variant} `} onClick={onClick}>{children}</button>
    )
}
export default Button
