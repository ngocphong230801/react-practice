// react
import React, { memo, useMemo } from 'react';
import { Controller, Control } from 'react-hook-form';
import isEqual from 'react-fast-compare';

// css
import "./index.css";

export interface DropdownSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string; color?: string }[];
    control: Control;
    isDisabled: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = memo(({
    name,
    label,
    options,
    control,
    isDisabled,
}) => {
    const renderedOptions = useMemo(() => options.map(({ value, label }) => (
        <option key={value} value={value}>
            {label}
        </option>
    )), [options]);

    return (
        <div className={`dropdown ${isDisabled ? 'disabled' : ''}`}>
            <label htmlFor={name} className="dropdown-label">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                    <select
                        id={name}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        disabled={isDisabled}
                        className={`dropdown-select ${value ? 'selected' : 'placeholder'}`}
                    >
                        <option value="">{`Select ${label}`}</option>
                        {renderedOptions}
                    </select>
                )}
            />
        </div>
    );
}, (prevProps, nextProps) => isEqual(prevProps, nextProps));

export default DropdownSelect;
