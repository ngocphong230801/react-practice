// react
import React, {useCallback } from "react";

// types
import { StudentProfile, IStudentInformation } from "@type/studentProfile";

// assets
import { email, phone, teacher } from "@assets/icon";

// helpers
import useClassmatesList from "@helpers/filterClassmates";
import { DISPLAY_COUNT } from "@constants/displayCount";

// css
import "./Information.css";

// item
import InformationItem from "./InfomationItem";

export interface InformationStudentProps {
    student: StudentProfile;
    classmates: IStudentInformation[];
}

const InformationStudent: React.FC<InformationStudentProps> = React.memo(
    ({ student, classmates }) => {
        const classmatesList = useClassmatesList(student.studentID, student.classes, classmates);
        
        const renderClassmates = useCallback(() => {
            return classmatesList
                .slice(0, DISPLAY_COUNT)
                .map((classmate) => (
                    <img
                        key={classmate.studentID}
                        src={classmate.imageUrl}
                        alt={classmate.name}
                        className="classmate-image"
                    />
                ));
        }, [classmatesList]);

        const renderMoreClassmates = useCallback(() => (
            classmatesList.length > DISPLAY_COUNT ? (
              <span className="more-classmates">
                +{classmatesList.length - DISPLAY_COUNT} more
              </span>
            ) : null
          ), [classmatesList]);
          
        return (
            <div className="information-student">
                <div className="info-student">
                    <span className="student-id">{student.studentID}</span>
                    <img
                        src={student.imageUrl}
                        alt="student-img"
                        className="student-image"
                    />
                    <div className="name-item">
                        <span className="student-name">{student.name}</span>
                        <p className="science-student">Science student</p>
                    </div>
                    <div className="icon-item">
                        <img src={teacher} alt="icon" className="icon" />
                        <img src={phone} alt="icon" className="icon" />
                        <img src={email} alt="icon" className="icon" />
                    </div>
                    <div className="group-item">
                        <InformationItem label="Age" value={student.age} className="age-item" />
                        <InformationItem label="Gender" value={student.gender} className="gender-item" />
                    </div>
                    <InformationItem label="Phone number" value={student.phone} className="phone-item" />
                    <InformationItem label="Email" value={student.email} />
                    <div className="item">
                        <p className="label">People from the same class</p>
                        <div className="classmates-images">
                            {renderClassmates()}
                            {renderMoreClassmates()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default InformationStudent;
