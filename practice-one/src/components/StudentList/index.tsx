import React from 'react';
import { StudentProfile } from "../../types";
import "./index.css"

interface ListStudentProps {
    students: StudentProfile[];
}

const ListStudent: React.FC<ListStudentProps> = ({ students }) => {

    return (
        <div className="list-student">
            <ul className="list-header">
                <li className="list-header-item name">Name</li>
                <li className="list-header-item id">StudentID</li>
                <li className="list-header-item email">Email address</li>
                <li className="list-header-item class">Class</li>
                <li className="list-header-item gender">Gender</li>
            </ul>
            <ul className="list-body">
                {students.map((student, index) => (
                    <li key={index} className={`student-row ${index % 2 !== 0 ? 'odd-row' : ''}`}>
                        <span className="student-name">{student.name}</span>
                        <span className="student-id">{student.studentID}</span>
                        <span className="student-email">{student.email}</span>
                        <span className="student-class">{student.classes}</span>
                        <span className="student-gender">{student.gender}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListStudent;
