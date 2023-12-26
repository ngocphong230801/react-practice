import SideBar from "../../layouts/SideBar";
import Header from "../../components/common/Header";
import { Notify } from "../../components/Icon";
import Button from "../../components/common/Button";
import "./index.css"
import ListStudent from "../../components/StudentList";
import Input from "../../components/common/Input";

const StudentPage: React.FC = (): React.ReactElement =>{

    return (
        <div className="student-page">
            <Header logOut="Logout" icon={<Notify />} />
            <SideBar />
            <Button
                title="Add student"
                className="btn-default"
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
            <ListStudent />
        </div>
    )
}

export default StudentPage
