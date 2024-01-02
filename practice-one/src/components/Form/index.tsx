import React, { useState, useRef } from "react"
import "./Form.css"
import Button from "../common/Button";
import Input from "../common/Input";
import { isValidEmail, isValidName, isValidPhone, isValidPassworld } from "../../helpers/validation";
import { ERROR_MESSAGES } from "../../constants/error";
import { uploadImage } from "../../helpers/uploadImage";


interface AddStudentFormProps {
    closeForm: () => void;
    onStudentAdd: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ closeForm, onStudentAdd }) => {
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
    const [classError, setClassError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageError, setImageError] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);


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
        const value = e.target.value;
        setClasses(value);
        setClassError(value === "default" ? ERROR_MESSAGES.FIELD_EMPTY : "");
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setGender(value);
        setGenderError(value === "default" ? ERROR_MESSAGES.FIELD_EMPTY : "");
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setUploading(true);

            setImagePreviewUrl(URL.createObjectURL(file));

            try {
                const uploadedUrl = await uploadImage(file);
                if (uploadedUrl) {
                    setImageUrl(uploadedUrl);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setUploading(false);
                setImageError("");
            }
        }
    };


    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isAnyFieldEmpty = !name || !email || !phone || !gender || !password || !classes || !image;

        setNameError(!name ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setEmailError(!email ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setPhoneError(!phone ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setPasswordError(!password ? ERROR_MESSAGES.FIELD_EMPTY : "");
        setClassError(!classes ? ERROR_MESSAGES.CLASS : "");
        setGenderError(!gender ? ERROR_MESSAGES.GENDER : "");
        setImageError(!imageUrl ? ERROR_MESSAGES.IMAGE : "");


        if (isAnyFieldEmpty || nameError || emailError || phoneError || passwordError || genderError || classError || imageError) {
            return;
        } else {
            closeForm();
        }

        const generateStudentID = () => {
            return Math.floor(10000 + Math.random() * 90000);
        };

        const studentID = generateStudentID();
        const studentAge = "17";

        const newStudent = { studentID, name, email, phone, gender, password, classes, studentAge, imageUrl };

        const students = JSON.parse(localStorage.getItem('students') || '[]');

        students.push(newStudent);

        localStorage.setItem('students', JSON.stringify(students));
        onStudentAdd();

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
        setImageError("");
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
                    <div className="class-student item">
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
                        {classError && <span className="error-message">{classError}</span>}
                    </div>
                    <div className="gender-student item">
                        <select name="gender"
                            className="select-item"
                            value={gender}
                            onChange={handleGenderChange}>
                            <option value="default">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {genderError && <span className="error-message">{genderError}</span>}
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
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                />
                <Button
                    className="btn-default upload-img"
                    title="Upload Image"
                    onClick={handleImageUploadClick}
                    disabled={uploading}
                />
                {imageError && <span className="error-message error-img">{imageError}</span>}
                <Button
                    className="btn-primary btn-submit"
                    title="Add student"
                    buttonType="submit"
                />
                {imagePreviewUrl && (
                    <div className="image-preview">
                        <img src={imagePreviewUrl} alt="Preview" style={{ width: '100px', height: '100px' }} className="img-preview" />
                    </div>
                )}
            </div>
        </form>
    )
}

export default AddStudentForm
