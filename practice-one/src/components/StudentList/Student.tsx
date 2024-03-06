// react
import React, { useMemo } from 'react';

// types
import { StudentProfile } from 'src/types';

// css
import "./index.css";

interface StudentListItemProps {
    student: StudentProfile;
    isActive: boolean;
    isEvenIndex: boolean;
    onStudentClick: (student: StudentProfile) => void;
}

const Student: React.FC<StudentListItemProps> = ({ student, isActive, isEvenIndex, onStudentClick }) => {
    const renderedStudent = useMemo(() => {
        return (
            <li
                className={`student-row ${isActive ? 'active' : ''} ${isEvenIndex ? 'even-index' : ''}`}
                onClick={() => onStudentClick(student)}>
                <img src={student.imageUrl} alt="student-image" className='student-image' />
                <span className="student-name">{student.name}</span>
                <span className="student-id">{student.studentID}</span>
                <span className="student-email">{student.email}</span>
                <span className="student-class">{student.classes}</span>
                <span className="student-gender">{student.gender}</span>
            </li>
        );
    }, [student, isActive, isEvenIndex, onStudentClick]);

    return renderedStudent;
};

export default Student;
