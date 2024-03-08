import React, { memo } from 'react';
import { Controller, Control } from 'react-hook-form';
import "./index.css";

export interface DropdownSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string; color?: string }[];
    control: Control;
    requiredMessage?: string;
    error?: string | null;
    isDisabled: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = memo(({
    name,
    label,
    options,
    control,
    requiredMessage,
    error,
    isDisabled,
}) =>
 (
    <div className={`dropdown ${isDisabled ? 'disabled' : ''}`}>
        <label htmlFor={name} className="dropdown-label">{label}</label>
        <Controller
            name={name}
            control={control}
            rules={{ required: requiredMessage ? true : false }}
            render={({ field: { onChange, value, ref } }) => (
                <select
                    id={name}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    disabled={isDisabled}
                    className={`dropdown-select ${value ? 'selected' : 'placeholder'}`}
                >
                    <option disabled={!requiredMessage || value} value="">
                        {label}
                    </option>
                    {options.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            )}
        />
        {requiredMessage && (
            <span className="required-message">{requiredMessage}</span>
        )}
        {error && <span className="error-message">{error}</span>}
    </div>
));

export default DropdownSelect;
