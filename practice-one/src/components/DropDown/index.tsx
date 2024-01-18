// react-hook-form
import { Controller, Control } from 'react-hook-form';
import { useState } from 'react';

// css
import "./Dropdown.css"

interface DropdownSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string; color?: string }[];
    control: Control<any>;
    requiredMessage?: string;
    isRequired?: boolean;
    error?: string | null;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
    name,
    label,
    options,
    control,
    requiredMessage,
    isRequired = true,
    error,
}) => {
    const [isDefaultSelected, setIsDefaultSelected] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIsDefaultSelected(event.target.value === '');
    };

    return (
        <div className={`${name}-select item`}>
            <p className="item-title">{label}</p>
            <Controller
                name={name}
                control={control}
                rules={isRequired ? { required: requiredMessage } : {}}
                render={({ field }) => (
                    <select {...field}
                        className={`select-item ${isDefaultSelected || field.value === '' ? 'default-selected' : 'option-selected'}`}
                        onChange={(e) => {
                            field.onChange(e);
                            handleChange(e);
                        }}>
                        <option value="">{label}</option>
                        {options.map(option => (
                            <option key={option.value} value={option.value} className='option'>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default DropdownSelect;
