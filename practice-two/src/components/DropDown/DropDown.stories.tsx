import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import DropdownSelect, { DropdownSelectProps } from '.';
import { CLASS_OPTIONS, GENDER_OPTIONS } from '@constants/dropdownData';

export default {
    title: 'Components/DropdownSelect',
    component: DropdownSelect,
} as Meta<typeof DropdownSelect>;



export const Default: StoryObj<DropdownSelectProps> = {
    render: (args) => {

        const methods = useForm();

        return (
            <FormProvider {...methods}>
                <DropdownSelect {...args} />
            </FormProvider>
        );
    },
    args: {
        name: 'Class',
        options: CLASS_OPTIONS,
        error: null,
        disabled: false,
    },
};

export const Gender: StoryObj<DropdownSelectProps> = {
    render: (args) => {

        const methods = useForm();

        return (
            <FormProvider {...methods}>
                <DropdownSelect {...args} />
            </FormProvider>
        );
    },
    args: {
        name: 'Class',
        options: GENDER_OPTIONS,
        error: null,
        disabled: false,
    },
};
