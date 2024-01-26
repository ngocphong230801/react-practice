import { StudentProfile } from "@type/studentProfile";
import { IFormInput } from "@components/Form";

export const addStudentToAPI = async (studentData: IFormInput) => {
    try {
        const response = await fetch("https://657bfea7394ca9e4af152952.mockapi.io/api/students/students", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });

        if (!response.ok) {
            throw new Error('Error in API call');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding student:', error);
    }
};

export const fetchStudentsAPI = async (): Promise<StudentProfile[] | string> => {
    try {
        const response = await fetch("https://657bfea7394ca9e4af152952.mockapi.io/api/students/students");
        if (!response.ok) {
            throw new Error('Error fetching students');
        }
        const studentsData: StudentProfile[] = await response.json();
        return studentsData;
    } catch (error) {
        console.error('Error fetching students:', error);
        return error instanceof Error ? error.message : 'Unknown error';
    }
};
