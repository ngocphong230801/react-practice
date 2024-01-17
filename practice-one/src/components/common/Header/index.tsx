// css
import "./Header.css";

// react
import React, { ReactNode} from "react";

// type
import { THeader } from "@type/header";

type CustomHeaderProps = {
    className?: THeader;
    title?: string;
    content?: string;
    children?: ReactNode;
    icon?: ReactNode;
    logOut?: string;
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
