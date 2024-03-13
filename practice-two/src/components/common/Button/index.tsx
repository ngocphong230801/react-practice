import React, { ReactNode, memo, useMemo } from 'react';

// Import CSS
import './index.css';

// Import type
import { ButtonType, ButtonVariant } from '@type/button';

export interface CustomButtonProps {
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  buttonType?: ButtonType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<CustomButtonProps> = memo(({
  className,
  iconLeft,
  iconRight,
  title,
  variant = ButtonVariant.DEFAULT,
  disabled = false,
  loading = false,
  buttonType = ButtonType.BUTTON,
  onClick,
}) => {
  const renderContent = useMemo(() => {
    if (loading) return 'Loading...';
    return (
      <>
        {iconLeft}
        {title}
        {iconRight}
      </>
    );
  }, [loading, iconLeft, title, iconRight]);

  return (
    <button
      type={buttonType}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {renderContent}
    </button>
  );
});

export default Button;
