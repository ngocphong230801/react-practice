interface IFormInput {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    classes: string;
}

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
