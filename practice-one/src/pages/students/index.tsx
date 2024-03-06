// react
import React, { useState, useEffect, useCallback, memo, useMemo } from "react";

// layout
import SideBar from "@layouts/SideBar";

// components
import { CheckDown, Support } from "@components/Icon";
import Button from "@components/common/Button";
import StudentSearch from "@components/SearchBox";
import ListStudent from "@components/StudentList";
import InformationStudent from "@components/Infomation";
import StudentForm from "@components/Form";

// types
import { IStudentInformation, StudentProfile } from "src/types/studentProfile";

// assets
import { EmptyPage } from "@assets/image";
import { mention, search } from "@assets/icon";

// css
import "./index.css";
import { fetchStudentsAPI } from "@service/api";

const StudentPage: React.FC = (): React.ReactElement => {
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [selectedStudent, setSelectedStudent] =
        useState<StudentProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>(
        []
    );

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        setFilteredStudents(students);
    }, [students]);

    const handleSearchResult = useCallback((results: StudentProfile[]) => {
        setFilteredStudents(results);
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const result = await fetchStudentsAPI();
            if (Array.isArray(result)) {
                setStudents(result);
                setSelectedStudent(result.length > 0 ? result[0] : null);
            } else {
                console.error(result);
                alert("Failed to fetch students. Please try again later.");
                setSelectedStudent(null);
                setStudents([]);
            }
        } catch (error) {
            console.error(error);
            alert("An unexpected error occurred. Please try again later.");
            setSelectedStudent(null);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudentClick = useCallback(() => {
        setShowStudentForm((prev) => !prev);
    }, []);

    const handleCloseForm = useCallback(() => {
        setShowStudentForm(false);
    }, []);

    const handleStudentAdded = useCallback(() => {
        fetchStudents();
        handleCloseForm();
    }, []);

    const handleStudentSelect = useCallback((student: StudentProfile) => {
        setSelectedStudent(student);
    }, []);

    const dataStudentInfo = useMemo(
        (): IStudentInformation[] =>
            filteredStudents.map((student: StudentProfile) => {
                return {
                    imageUrl: student.imageUrl,
                    name: student.name,
                    studentID: student.studentID,
                    classes: student.classes,
                };
            }),
        [filteredStudents]
    );

    return (
        <div className="container">
            <div className="student-page">
                <div className="layout">
                    <SideBar />
                    <span className="log-out">Logout</span>
                    <img src={mention} alt="mention" className="icon-mention" />
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        {students.length === 0 ? (
                            <>
                                <div className="student-controls-empty">
                                    <p className="student-section-title">
                                        Students
                                    </p>
                                    <div className="student-action-container">
                                        <a
                                            href="#"
                                            className="export-csv-empty"
                                        >
                                            Export CSV
                                        </a>
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
                                        <option value="default">
                                            Add filter
                                        </option>
                                    </select>
                                    <img
                                        src={search}
                                        alt="icon-search"
                                        className="icon-    search"
                                    />
                                    <StudentSearch
                                        students={students}
                                        onSearchResult={handleSearchResult}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <a href="#" className="export-csv">
                                    Export CSV
                                </a>
                                <div className="button-container">
                                    <Button
                                        title="Add student"
                                        className="btn-default btn-add-student"
                                        onClick={handleAddStudentClick}
                                    />
                                </div>
                                <div className="search-box">
                                    <select className="filter">
                                        <option value="default">
                                            Add filter
                                        </option>
                                    </select>
                                    <img
                                        src={search}
                                        alt="icon-search"
                                        className="icon-search"
                                    />
                                    <StudentSearch
                                        students={students}
                                        onSearchResult={handleSearchResult}
                                    />
                                </div>
                            </>
                        )}

                        {showStudentForm && (
                            <div
                                className="overlay"
                                onClick={handleCloseForm}
                            ></div>
                        )}
                        {showStudentForm && (
                            <StudentForm
                                closeForm={handleCloseForm}
                                onStudentAdd={handleStudentAdded}
                            />
                        )}

                        {students.length === 0 ? (
                            <div className="no-student">
                                <img src={EmptyPage} alt="empty-page-image" />
                                <h2 className="empty-message">
                                    No students at this time
                                </h2>
                                <p className="enrollment-message">
                                    Students will appear here after they enroll
                                    in your school.
                                </p>
                                <Button
                                    className="btn-secondary"
                                    title="Support"
                                    iconLeft={<Support />}
                                    iconRight={<CheckDown />}
                                />
                            </div>
                        ) : (
                            <>
                                <ListStudent
                                    students={filteredStudents}
                                    onStudentClick={handleStudentSelect}
                                />
                                {selectedStudent && (
                                    <InformationStudent
                                        student={selectedStudent}
                                        classmates={dataStudentInfo}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(StudentPage);
