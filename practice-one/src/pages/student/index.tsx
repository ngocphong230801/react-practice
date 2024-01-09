import React, { useState, useEffect } from "react";
import SideBar from "../../layouts/SideBar";
import Header from "../../components/common/Header";
import { CheckDown, Notify, Support } from "../../components/Icon";
import Button from "../../components/common/Button";
import "./index.css";
import ListStudent from "../../components/StudentList";
import InformationStudent from "../../components/Infomation";
import Input from "../../components/common/Input";
import StudentForm from "../../components/Form";
import { StudentProfile } from "../../types";
import { EmptyPage } from "../../assets/image";
import { Search } from "../../assets/icon";


const StudentPage: React.FC = (): React.ReactElement => {
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch("https://657bfea7394ca9e4af152952.mockapi.io/api/students/students");
            if (!response.ok) {
                throw new Error('Error fetching students');
            }
            const studentsData = await response.json();
            setStudents(studentsData);
            if (studentsData.length > 0) {
                setSelectedStudent(studentsData[0]);
            } else {
                setSelectedStudent(null);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddStudentClick = () => {
        setShowStudentForm(!showStudentForm);
    };

    const handleCloseForm = () => {
        setShowStudentForm(false);
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

            {students.length === 0 ? (
                <>
                    <div className="student-controls-empty">
                        <p className="student-section-title">Students</p>
                        <div className="student-action-container">
                            <a href="#" className="export-csv-empty">Export CSV</a>
                            <div className="button-container-empty">
                                <Button
                                    title="Add student"
                                    className="btn-default btn-add-student-empty"
                                    onClick={handleAddStudentClick}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="search-box-empty">
                        <select className="filter">
                            <option value="default">Add filter</option>
                        </select>
                        <img src={Search} alt="icon-search" className="icon-search" />
                        <Input
                            className="secondary"
                            type="text"
                            name="search-box"
                            placeholder="Search for a student by name or email"
                        />
                    </div>

                </>
            ) : (
                <>
                    <a href="#" className="export-csv">Export CSV</a>
                    <div className="button-container">
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
                        <img src={Search} alt="icon-search" className="icon-search" />
                        <Input
                            className="secondary"
                            type="text"
                            name="search-box"
                            placeholder="Search for a student by name or email"
                        />
                    </div>
                </>
            )}

            {showStudentForm && <div className="overlay" onClick={handleCloseForm}></div>}
            {showStudentForm && (
                <StudentForm closeForm={handleCloseForm} onStudentAdd={handleStudentAdded} />
            )}

            {students.length === 0 ? (
                <div className="no-student">
                    <img src={EmptyPage} alt="empty-page-image" />
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
