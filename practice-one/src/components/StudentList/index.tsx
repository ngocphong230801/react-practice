// react
import React, { useState, useEffect, useCallback } from 'react';

// types
import { StudentProfile } from 'src/types';

// children
import Student from './Student';

// css
import "./index.css";

interface ListStudentProps {
    students: StudentProfile[];
    onStudentClick: (student: StudentProfile) => void;
}

const ListStudent: React.FC<ListStudentProps> = React.memo(({ students, onStudentClick }) => {
    const [activeStudentId, setActiveStudentId] = useState<number | null>(null);

    useEffect(() => {
        if (students.length > 0) {
            setActiveStudentId(students[0].studentID);
        }
    }, [students]);

    const handleStudentClick = useCallback((student: StudentProfile) => {
        setActiveStudentId(student.studentID);
        onStudentClick(student);
    }, [onStudentClick]);

    return (
        <div className="list-student">
            <ul className="list-header">
                <li className="list-header-item name">Name</li>
                <li className="list-header-item id">Student ID</li>
                <li className="list-header-item email">Email address</li>
                <li className="list-header-item class">Class</li>
                <li className="list-header-item gender">Gender</li>
            </ul>
            <ul className="list-body">
                {students.map((student, index) => (
                    <Student
                        key={student.studentID}
                        student={student}
                        isActive={activeStudentId === student.studentID}
                        isEvenIndex={index % 2 != 0}
                        onStudentClick={handleStudentClick}
                    />
                ))}
            </ul>
        </div>
    );
});

export default ListStudent;
