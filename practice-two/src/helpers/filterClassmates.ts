import { StudentProfile, IStudentInformation } from "@type/studentProfile";

export const filterClassmates = (
    allClassmates: IStudentInformation[],
    currentStudent: StudentProfile
): IStudentInformation[] => {
    return allClassmates.filter(
        (classmate) =>
            classmate.classes === currentStudent.classes &&
            classmate.studentID !== currentStudent.studentID
    );
};
