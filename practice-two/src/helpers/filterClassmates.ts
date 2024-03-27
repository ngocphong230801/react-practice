import { IStudentInformation } from "@type/studentProfile";
import { useMemo } from 'react';

// Assuming filterClassmates is defined in the same or another file
export const filterClassmates = (
    allClassmates: IStudentInformation[],
    classID: string 
): IStudentInformation[] => {
    return allClassmates.filter(
        (classmate) => classmate.classes === classID
    );
};

const useClassmatesList = (studentID: string, classID: string, classmates: IStudentInformation[]) => {
    const classmatesList = useMemo(() => {
        // First, filter classmates by classID
        const sameClassClassmates = filterClassmates(classmates, classID);
        // Then, exclude the current student from the list
        return sameClassClassmates.filter(classmate => classmate.studentID !== studentID);
    }, [classmates, studentID, classID]);

    return classmatesList;
};

export default useClassmatesList;
