import "./Information.css"

import { StudentProfile } from "../../types";
import { Email, Logo, Phone, Teacher } from "../../assets/icon";

interface InformationStudentProrp {
    students: StudentProfile[];
}


const InformationStudent: React.FC<InformationStudentProrp> = ({ students }) => {
    return (
        <div className="information-student">
            {students.map((student, index) => (
                <li key={index} className="info-student" >
                    <span className="student-id">{student.studentID}</span>
                    <img src={Logo} alt="student-img" className="student-image" />
                    <div className="name-item">
                        <span className="student-name">{student.name}</span>
                        <p className="science-student">Science student</p>
                    </div>
                    <div className="icon-item">
                        <img src={Teacher} alt="icon" className="icon" />
                        <img src={Phone} alt="icon" className="icon"/>
                        <img src={Email} alt="icon" className="icon" />
                    </div>
                    <div className="group-item">
                        <div className="age-item">
                            <p className="label">Age</p>
                            <span className="student-age">{student.studentAge}</span>
                        </div>
                        <div className="gender-item">
                            <p className="label">Gender</p>
                            <span className="student-gender">{student.gender}</span>
                        </div>
                    </div>
                    <div className="phone-item">
                        <p className="label">Phone number</p>
                        <span className="student-phone">{student.phone}</span>
                    </div>
                    <div>
                        <p className="label">Email</p>
                        <span className="student-email">{student.email}</span>
                    </div>
                    <div>
                        <p className="label">People from the same class</p>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default InformationStudent
