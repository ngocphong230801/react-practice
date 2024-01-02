import React, { useState, useEffect } from "react";
import SideBar from "../../layouts/SideBar";
import Header from "../../components/common/Header";
import { CheckDown, Notify, Support } from "../../components/Icon";
import Button from "../../components/common/Button";
import "./index.css";
import ListStudent from "../../components/StudentList";
import InformationStudent from "../../components/Infomation";
import Input from "../../components/common/Input";
import AddStudentForm from "../../components/Form";
import { StudentProfile } from "../../types";
import { EmptyPage } from "../../assets/image";


const StudentPage: React.FC = (): React.ReactElement => {
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        setStudents(storedStudents);
        if (storedStudents.length > 0) {
            setSelectedStudent(storedStudents[0]);
        } else {
            setSelectedStudent(null);
        }
    };

    const handleAddStudentClick = () => {
        setShowAddStudentForm(!showAddStudentForm);
    };

    const handleCloseForm = () => {
        setShowAddStudentForm(false);
    };

    const handleStudentAdded = () => {
        fetchStudents();
        handleCloseForm();
    };

    const handleStudentSelect = (student: StudentProfile) => {
        setSelectedStudent(student);
    };

    return (
        <div className="student-page">
            <Header logOut="Logout" icon={<Notify />} />
            <SideBar />
            <a href="#" className="export-csv">Export CSV</a>
            <div className={students.length === 0 ? "button-container-empty" : "button-container"}>
                <Button
                    title="Add student"
                    className="btn-default btn-add-student"
                    onClick={handleAddStudentClick}
                />
            </div>
            <div className="search-box">
                <select className="filter">
                    <option value="default">Add filter</option>
                </select>
                <Input
                    className="input-secondary"
                    type="text"
                    name="search-box"
                    placeholder="Search for a student by name or email"
                />
            </div>
            {showAddStudentForm && <div className="overlay" onClick={handleCloseForm}></div>}
            {showAddStudentForm && (
                <AddStudentForm closeForm={handleCloseForm} onStudentAdd={handleStudentAdded} />
            )}
            {students.length === 0 ? (
                <div className="no-student">
                    <img src= {EmptyPage} alt="empty-page-image" />
                    <h2 className="empty-message">No students at this time</h2>
                    <p className="enrollment-message">Students will appear here after they enroll in your school.</p>
                    <Button
                        className="btn-secondary"
                        title="Support"
                        iconLeft={<Support />}
                        iconRight={<CheckDown />}
                    />
                </div>
            ) : (
                <>
                    <ListStudent students={students} onStudentClick={handleStudentSelect} />
                    {selectedStudent && <InformationStudent student={selectedStudent} students={students} />}
                </>
            )}
        </div>
    );
}

export default StudentPage;
