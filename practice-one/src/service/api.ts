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

export const fetchStudentsAPI = (): Promise<StudentProfile[]> => {
    return fetch("https://657bfea7394ca9e4af152952.mockapi.io/api/students/students")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching students');
            }
            return response.json();
        })
        .then((studentsData: StudentProfile[]) => studentsData)
        .catch(error => {
            console.error('Error fetching students:', error);
            throw error;
        });
};
