import { IStudentInformation } from "@type/studentProfile";
import { useMemo } from 'react';

// Assuming filterClassmates is defined in the same or another file
// This function filters classmates based on a given classID.
export const filterClassmates = (
    allClassmates: IStudentInformation[],
    classID: string 
): IStudentInformation[] => {
    // Use Array.filter() to return only the classmates that have the same classID
    return allClassmates.filter(
        (classmate) => classmate.classes === classID
    );
};

// Custom hook to get a list of classmates excluding the current student
const useClassmatesList = (studentID: string, classID: string, classmates: IStudentInformation[]) => {
    const classmatesList = useMemo(() => {
        // First, filter out classmates who are in the same class as the provided classID
        const sameClassClassmates = filterClassmates(classmates, classID);
        // Then, exclude the current student from the list to avoid self-referencing
        return sameClassClassmates.filter(classmate => classmate.studentID !== studentID);
    }, [classmates, studentID, classID]); // Dependencies array to optimize and recompute only if any of these values change

    return classmatesList;
};

export default useClassmatesList;
