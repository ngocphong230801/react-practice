import React from 'react';

interface DropdownSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    register: any; // react-hook-form
    requiredMessage: string;
    errors: any; // react-hook-form
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
    name,
    label,
    options,
    register,
    requiredMessage,
    errors
}) => {
    return (
        <div className={`${name}-select item`}>
            <p className="item-title">{label}</p>
            <select {...register(name, { required: requiredMessage })} className="select-item">
                <option value="">{label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <span className="error-message">{errors[name].message}</span>}
        </div>
    );
};

export default DropdownSelect;
