import "./index.css"
import { useState, useEffect } from 'react';
import { StudentProfile } from "../../types";

const ListStudent = () => {
    const [students, setStudents] = useState<StudentProfile[]>([]);

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        setStudents(storedStudents);
    }, []);

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
                {students.map((students, index) => (
                    <li key={index} className={`student-row ${index % 2 !== 0 ? 'odd-row' : ''}`}>
                        <span className="student-name">{students.name}</span>
                        <span className="student-id">{students.studentID}</span>
                        <span className="student-email">{students.email}</span>
                        <span className="student-class">{students.classes}</span>
                        <span className="student-gender">{students.gender}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListStudent
