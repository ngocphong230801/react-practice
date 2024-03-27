export interface StudentProfile {
    name: string;
    studentID: string;
    email: string;
    classes: string;
    gender: string
    phone: number;
    password: string;
    imageUrl: string;
    age: number;
}

export type IStudentInformation = Pick<StudentProfile, 'name' | 'studentID' | 'imageUrl' | 'classes'>;