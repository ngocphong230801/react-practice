import { IStudentInformation } from "@type/studentProfile";

export const filterClassmates = (
    allClassmates: IStudentInformation[],
    studentID: string 
): IStudentInformation[] => {
    return allClassmates.filter(
        (classmate) => classmate.classes === studentID
    );
};
