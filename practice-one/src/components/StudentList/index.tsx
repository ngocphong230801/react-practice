// react
import React ,{useState, useEffect} from 'react';

// types
import { StudentProfile } from 'src/types';

// css
import "./StudentList.css"

interface ListStudentProps {
    students: StudentProfile[];
    onStudentClick: (student: StudentProfile) => void;
}

const ListStudent: React.FC<ListStudentProps> = ({ students, onStudentClick }) => {
    const [activeStudentId, setActiveStudentId] = useState<number | null>(null);

    useEffect(() => {
        if (students.length > 0) {
            setActiveStudentId(students[0].studentID);
        }
    }, [students]);

    const handleStudentClick = (student: StudentProfile) => {
        setActiveStudentId(student.studentID);
        onStudentClick(student);
    };

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
                    <li key={student.studentID}
                        className={`student-row ${index % 2 !== 0 ? 'odd-row' : ''} ${activeStudentId === student.studentID ? 'active' : ''}`}
                        onClick={() => handleStudentClick(student)}>
                        <img src={student.imageUrl} alt="student-image" className='student-image'/>
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
