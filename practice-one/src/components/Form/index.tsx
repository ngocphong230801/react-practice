import React, { useState } from "react"
import "./Form.css"
import Button from "../common/Button";
import Input from "../common/Input";

import { isValidEmail, isValidName, isValidPhone, isValidPassworld } from "../../helpers/validation";
import { ERROR_MESSAGES } from "../../constants/error";

const AddStudentForm: React.FC = (): React.ReactElement => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [classes, setClasses] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        setNameError(
            !value ? ERROR_MESSAGES.FIELD_EMPTY :
                !isValidName(value) ? ERROR_MESSAGES.NAME :
                    ""
        );
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(
            !value ? ERROR_MESSAGES.FIELD_EMPTY :
                !isValidEmail(value) ? ERROR_MESSAGES.EMAIL :
                    ""
        );
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneError(
            !value ? ERROR_MESSAGES.FIELD_EMPTY :
                !isValidPhone(value) ? ERROR_MESSAGES.PHONE :
                    ""
        );
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(
            !value ? ERROR_MESSAGES.FIELD_EMPTY :
                !isValidPassworld(value) ? ERROR_MESSAGES.PASSWORLD :
                    ""
        );
    }

    const handleClassesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setClasses(e.target.value);
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const isAnyFieldEmpty = !name || !email || !phone || !gender || !password || classes === "default";

        setNameError(!name ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setEmailError(!email ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setPhoneError(!phone ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setPasswordError(!password ? ERROR_MESSAGES.FIELD_EMPTY : "");
    
       
        if (isAnyFieldEmpty || nameError || emailError || phoneError || passwordError) {
            return;
        }
    
        const newStudent = { name, email, phone, gender, password, classes };
    
        const students = JSON.parse(localStorage.getItem('students') || '[]');
    
        students.push(newStudent);

        localStorage.setItem('students', JSON.stringify(students));
    
        setName("");
        setEmail("");
        setPhone("");
        setGender("");
        setPassword("");
        setClasses(""); 
        setNameError("");
        setEmailError("");
        setPhoneError("");
        setPasswordError("");
    };
    
    
    return (
        <form className="add-student-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2 className="heading-form">Add Students</h2>
                <div className="link-group">
                    <a href="#" className="link-group-item">Manually</a>
                    <a href="#" className="link-group-item">Import CSV</a>
                </div>
            </div>
            <div className="form-body">
                <div className="form-body-item">
                    <div className="student-name item">
                        <p className="item-title">Name</p>
                        <Input
                            className="input-default"
                            type="text"
                            value={name}
                            name="name"
                            onChange={handleNameChange}
                        />
                        {nameError && <span className="error-message">{nameError}</span>}
                    </div>
                    <div className="class-student">
                        <select
                            name="classes"
                            className="select-item"
                            value={classes}
                            onChange={handleClassesChange}>
                            <option value="default">Class</option>
                            <option value="SS1">SS1</option>
                            <option value="SS2">SS2</option>
                            <option value="SS3">SS3</option>
                            <option value="SS4">SS4</option>
                            <option value="SS5">SS5</option>
                            <option value="SS6">SS6</option>
                        </select>
                    </div>
                    <div className="gender-student">
                        <select name="gender"
                            className="select-item"
                            value={gender}
                            onChange={handleGenderChange}>
                            <option value="default">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="form-body-item">
                    <div className="studen-email item">
                        <p className="item-title">Email</p>
                        <Input
                            className="input-primary"
                            type="email"
                            value={email}
                            name="email"
                            onChange={handleEmailChange}
                        />
                        {emailError && <span className="error-message">{emailError}</span>}
                    </div>
                    <div className="studen-phone item">
                        <p className="item-title">Phone</p>
                        <Input
                            className="input-primary"
                            type="text"
                            value={phone}
                            name="phone"
                            onChange={handlePhoneChange}
                        />
                        {phoneError && <span className="error-message">{phoneError}</span>}
                    </div>
                </div>
                <div className="studen-passworld item">
                    <p className="item-title">Password</p>
                    <Input
                        className="input-primary"
                        type="text"
                        value={password}
                        name="passwold"
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <span className="error-message">{passwordError}</span>}
                </div>
                <Button
                    className="btn-primary"
                    title="Add student"
                    buttonType="submit"
                />
            </div>
        </form>
    )
}

export default AddStudentForm
