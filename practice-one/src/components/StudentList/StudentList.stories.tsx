import { Meta, StoryObj } from '@storybook/react';
import ListStudent from './index';
import { StudentProfile } from "../../types";

export default {
    title: 'Components/ListStudent',
    component: ListStudent,
} as Meta<typeof ListStudent>;

const mockStudents: StudentProfile[] = [
    {
        studentID: 88888,
        name: 'Nguyen Ngoc Phong',
        email: 'nnphong962015@gmail.com',
        classes: 'SS1',
        gender: "Male",
        imageUrl: 'https://i.ibb.co/MR3sF65/avt1.jpg',
        phone: 123-456-7890,
        password: '2382001Phong',
        studentAge: 20
    },
];

export const Default: StoryObj<typeof ListStudent> = {
    args: {
        students: mockStudents,
        onStudentClick: (student: StudentProfile) => {
            console.log('Clicked on student:', student);
        },
    },
};
