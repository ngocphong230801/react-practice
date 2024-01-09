import { Controller, Control } from 'react-hook-form';

interface DropdownSelectProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    control: Control<any>; // Import Control from react-hook-form
    requiredMessage: string;
    error?: string | null;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
    name,
    label,
    options,
    control,
    requiredMessage,
    error,
}) => {
    return (
        <div className={`${name}-select item`}>
            <p className="item-title">{label}</p>
            <Controller
                name={name}
                control={control}
                rules={{ required: requiredMessage }}
                render={({ field }) => (
                    <>
                        <select {...field} className={`select-item ${error ? 'has-error' : ''}`}>
                            <option value="">{label}</option>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {error && <span className="error-message">{error}</span>} {/* Display error message */}
                    </>
                )}
            />
        </div>
    );
};

export default DropdownSelect;
