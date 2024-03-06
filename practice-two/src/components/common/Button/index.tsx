// react
import React, { MouseEventHandler, ReactNode } from 'react';

// item
import './index.css';

// type
import { ButtonVariant } from '@type/varianButton';

interface CustomButtonProps {
    className?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    title: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    buttonType?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<CustomButtonProps> = React.memo(({
    className = '',
    iconLeft,
    iconRight,
    title,
    variant = ButtonVariant.DEFAULT,
    disabled = false,
    loading = false,
    buttonType = 'button',
    onClick,
}) => {
    const renderContent = () => {
        if (loading) return 'Loading...';
        return (
            <>
                {iconLeft}
                {title}
                {iconRight}
            </>
        );
    };

    return (
        <button
            type={buttonType}
            className={`btn btn-${variant} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {renderContent()}
        </button>
    );
});

export default Button;
