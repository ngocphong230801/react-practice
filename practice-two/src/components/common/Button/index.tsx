import React, { ReactNode, memo, useCallback, useMemo, useRef } from 'react';

// Import CSS
import './index.css';

// Import type
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

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

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      type={buttonType}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {renderContent}
    </button>
  );
});

export default Button;
