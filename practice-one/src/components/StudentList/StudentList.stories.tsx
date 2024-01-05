import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import ListStudent from './index';
import { StudentProfile } from "../../types";

export default {
    title: 'Components/ListStudent',
    component: ListStudent,
} as Meta<typeof ListStudent>;

export const Default: StoryObj<typeof ListStudent> = {
    render: () => {
        const [students, setStudents] = useState<StudentProfile[]>([]);

        useEffect(() => {
            const fetchStudents = () => {
                const storedStudents = localStorage.getItem('students');
                if (storedStudents) {
                    setStudents(JSON.parse(storedStudents));
                }
            };

            fetchStudents();
        }, []);

        const handleStudentClick = (student: StudentProfile) => {
            console.log('Clicked on student:', student);
        };

        return <ListStudent students={students} onStudentClick={handleStudentClick} />;
    },
};
