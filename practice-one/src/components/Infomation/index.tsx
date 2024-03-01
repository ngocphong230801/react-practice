// react
import React, { useMemo } from "react";

// types
import { IStudentInformation, StudentProfile } from "src/types";

// assets
import { email, phone, teacher } from "@assets/icon";

// css
import "./Information.css";

export interface InformationStudentProps {
    student: StudentProfile;
    classmates: IStudentInformation[];
}

const filterClassmates = (
    allClassmates: IStudentInformation[],
    currentStudent: StudentProfile
): IStudentInformation[] => {
    return allClassmates.filter(
        (classmate) =>
            classmate.classes === currentStudent.classes &&
            classmate.studentID !== currentStudent.studentID
    );
};

const InformationStudent: React.FC<InformationStudentProps> = React.memo(
    ({ student, classmates }) => {
        const classmatesList = useMemo(
            () => filterClassmates(classmates, student),
            [classmates, student]
        );
        const displayCount = 5;

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
                        <div className="age-item item">
                            <p className="label">Age</p>
                            <span className="student-age contact">
                                {student.age}
                            </span>
                        </div>
                        <div className="gender-item item">
                            <p className="label">Gender</p>
                            <span className="student-gender contact">
                                {student.gender}
                            </span>
                        </div>
                    </div>
                    <div className="phone-item item">
                        <p className="label">Phone number</p>
                        <span className="student-phone contact">
                            {student.phone}
                        </span>
                    </div>
                    <div className="item">
                        <p className="label">Email</p>
                        <span className="student-email contact">
                            {student.email}
                        </span>
                    </div>
                    <div className="item">
                        <p className="label">People from the same class</p>
                        <div className="classmates-images">
                            {classmatesList
                                .slice(0, displayCount)
                                .map((classmate) => (
                                    <img
                                        key={classmate.studentID}
                                        src={classmate.imageUrl}
                                        alt={classmate.name}
                                        className="classmate-image"
                                    />
                                ))}
                            {classmatesList.length > displayCount && (
                                <span className="more-classmates">
                                    +{classmatesList.length - displayCount} more
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default InformationStudent;
