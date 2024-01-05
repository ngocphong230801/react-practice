// react
import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
// css
import "./Form.css";
// components
import Button from "../common/Button";
import Input from "../common/Input";
import DropdownSelect from "../Dropdown";
// helpers
import { uploadImage } from "@helpers/uploadImage";


interface StudentFormProps {
    closeForm: () => void;
    onStudentAdd: () => void;
}

interface IFormInput {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    classes: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ closeForm, onStudentAdd }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const onSubmit = async (data: IFormInput) => {
        console.log("Form Submitted", data);
        let uploadedImageUrl = null;
        if (imageFile) {
            const uploadResult = await uploadImage(imageFile);
    
            if (uploadResult.error) {
                console.error("Error uploading image:", uploadResult.error);
            } else {
                uploadedImageUrl = uploadResult.data;
            }
        }
    
        const newStudentData = {
            ...data,
            studentID: Math.floor(10000 + Math.random() * 90000),
            studentAge: "17",
            imageUrl: uploadedImageUrl
        };

        const students = JSON.parse(localStorage.getItem('students') || '[]');
        students.push(newStudentData);
        localStorage.setItem('students', JSON.stringify(students));
        onStudentAdd();
        closeForm();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    const classOptions = [
        { value: 'SS1', label: 'SS1' },
        { value: 'SS2', label: 'SS2' },
        { value: 'SS3', label: 'SS3' },
        { value: 'SS4', label: 'SS4' },
        { value: 'SS5', label: 'SS5' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="add-student-form">
            <div className="form-header">
                <h2 className="heading-form">Add Student</h2>
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
                            {...register("name", { required: "Name is required" })}
                            className="default"
                            type="text"
                            name="name"
                        />
                        {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>
                    <DropdownSelect
                        name="classes"
                        label="Class"
                        options={classOptions}
                        register={register}
                        requiredMessage="Class is required"
                        errors={errors}
                    />
                    <DropdownSelect
                        name="gender"
                        label="Gender"
                        options={genderOptions}
                        register={register}
                        requiredMessage="Gender is required"
                        errors={errors}
                    />
                </div>
                <div className="form-body-item">

                    <div className="student-email item">
                        <p className="item-title">Email</p>
                        <Input
                            {...register("email", { required: "Email is required" })}
                            className="primary"
                            type="email"
                            name="email"
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>
                    <div className="student-phone item">
                        <p className="item-title">Phone</p>
                        <Input
                            {...register("phone", { required: "Phone is required" })}
                            className="primary"
                            type="text"
                            name="phone"
                        />
                        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                    </div>
                </div>

                <div className="studen-password item">
                    <p className="item-title">Password</p>
                    <Input
                        {...register("password", { required: "Password is required" })}
                        className="primary"
                        type="password"
                        name="password"
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>

                <input
                    type="file"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                />
                <Button
                    className="btn-default upload-img"
                    title="Upload Image"
                    onClick={() => fileInputRef.current?.click()}
                />
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="image-preview" />}

                <Button
                    className="btn-primary btn-submit"
                    title="Add Student"
                    buttonType="submit"
                />
            </div>
        </form>
    );
};

export default StudentForm;
