// react-hook-form
import { Controller, Control } from 'react-hook-form';

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
    disabled: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
    name,
    label,
    options,
    control,
    requiredMessage,
    isRequired = true,
    error,
    disabled,
}) => {
    return (
        <div className={`${name}-select item`}>
            <p className="item-title">{label}</p>
            <Controller
                name={name}
                control={control}
                disabled = {disabled}
                rules={isRequired ? { required: requiredMessage } : {}}
                render={({ field }) => (
                    <select {...field}
                        className={`select-item ${!field.value ? 'default-selected' : 'option-selected'}`}
                        onChange={(e) => {
                            field.onChange(e);
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
