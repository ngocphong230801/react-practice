import React, { ReactNode, memo } from 'react';

// item
import './index.css';

// type
import { ButtonVariant } from '@type/button';

export interface CustomButtonProps {
    className?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    title: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    buttonType?: 'button' | 'submit' | 'reset';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const renderContent = (
    iconLeft: ReactNode,
    title: string,
    iconRight: ReactNode,
    loading: boolean,
) => {
    if (loading) return 'Loading...';
    return (
        <>
            {iconLeft}
            {title}
            {iconRight}
        </>
    );
};

const Button: React.FC<CustomButtonProps> = memo(({
    className,
    iconLeft,
    iconRight,
    title,
    variant = ButtonVariant.DEFAULT,
    disabled = false,
    loading = false,
    buttonType = 'button',
    onClick,
}) => {
    return (
        <button
            type={buttonType}
            className={`btn btn-${variant} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {renderContent(iconLeft, title, iconRight, loading)}
        </button>
    );
});

export default Button;
