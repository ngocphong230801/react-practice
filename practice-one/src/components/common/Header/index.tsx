import "./Header.css";
import React, { ReactNode} from "react";
import { THeader } from "../../../types";

type CustomHeaderProps = {
    className: THeader;
    title?: string;
    content?: string;
    children?: ReactNode;
    icon?: ReactNode;
    logOut: string;
};

const Header: React.FC<CustomHeaderProps> = ({
    className = THeader.DEFAULT,
    title,
    content,
    children,
    icon,
    logOut,
}) =>
    <header className= {`header header-${className}`}>
        <div className="header-content">
        <p className="title">{title}</p>
        <p className= "content">{content}</p>
        </div>
        <span className="icon-notify">{icon}</span>
        {children}
        <a className="log-out">{logOut}</a>
    </header>;

export default Header;
