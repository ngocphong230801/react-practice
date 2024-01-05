import { Meta, StoryObj } from '@storybook/react';
import StudentForm, { StudentFormProps } from './index';
import "./Form.css"
export default {
    title: 'Components/StudentForm',
    component: StudentForm,

} as Meta<StudentFormProps>;

export const Default: StoryObj<StudentFormProps> = {
    args: {
        closeForm: () => console.log('Close Form clicked'),
        onStudentAdd: () => console.log('Student added'),
    },
};
