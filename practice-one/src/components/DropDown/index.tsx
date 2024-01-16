// react-hook-form
import { Controller, Control } from 'react-hook-form';

// css
import "./Dropdown.css"

interface DropdownSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    control: Control<any>; // Import Control from react-hook-form
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
    return (
        <div className={`${name}-select item`}>
            <p className="item-title">{label}</p>
            <Controller
                name={name}
                control={control}
                rules={isRequired ? { required: requiredMessage } : {}}
                render={({ field }) => (
                    <select {...field} className="select-item">
                        <option value="">{label}</option>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
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
