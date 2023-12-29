import SideBar from "../../layouts/SideBar";
import Header from "../../components/common/Header";
import { Notify } from "../../components/Icon";
import Button from "../../components/common/Button";
import "./index.css"
import ListStudent from "../../components/StudentList";
import Input from "../../components/common/Input";
import AddStudentForm from "../../components/Form";
import { useState, useEffect } from "react";
import { StudentProfile } from "../../types";
import InformationStudent from "../../components/Infomation";

const StudentPage: React.FC = (): React.ReactElement => {
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [students, setStudents] = useState<StudentProfile[]>([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        setStudents(storedStudents);
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

    return (
        <div className="student-page">
            <Header logOut="Logout" icon={<Notify />} />
            <SideBar />
            <a href="#" className="export-csv">Export CSV</a>
            <Button
                title="Add student"
                className="btn-default btn-add-student"
                onClick={handleAddStudentClick}
            />
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
            {showAddStudentForm && <AddStudentForm closeForm={handleCloseForm} onStudentAdd={handleStudentAdded} />}
            <ListStudent students={students} />
            <InformationStudent students={students} />
        </div>
    );
}

export default StudentPage
