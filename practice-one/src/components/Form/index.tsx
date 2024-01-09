// react
import React, { useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
// css
import "./Form.css";
// components
import Button from "../common/Button";
import Input from "../common/Input";
import DropdownSelect from "../Dropdown";
// helpers
import { uploadImage } from "@helpers/uploadImage";
import { addStudentToAPI } from "@helpers/api";
// constants
import { GENDER_OPTIONS, CLASS_OPTIONS } from "@constants/dropdownData";

export interface StudentFormProps {
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
    age: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ closeForm, onStudentAdd }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isDirty }
    } = useForm<IFormInput>({ mode: 'onChange' });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const onSubmit = async (data: IFormInput) => {
        let uploadedImageUrl = null;
        if (imageFile) {
            try {
                const uploadResult = await uploadImage(imageFile);
                uploadedImageUrl = uploadResult.data;
            } catch (error) {
                console.error("Error uploading image:", error);
                return;
            }
        }

        const newStudentData = {
            ...data,
            studentID: Math.floor(10000 + Math.random() * 90000),
            imageUrl: uploadedImageUrl
        };

        try {
            const result = await addStudentToAPI(newStudentData);
            if (result) {
                onStudentAdd();
                closeForm();
            } else {
                console.error("Failed to add student");
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const validFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];
            if (!validFormats.includes(file.type)) {
                alert("Invalid file format. Only SVG, PNG, and JPG are allowed.");
                return;
            }

            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

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
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => <Input {...field} className="default" type="text" />}
                        />
                        {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>
                    <div className="student-class item">
                        <DropdownSelect
                            name="classes"
                            label="Class"
                            options={CLASS_OPTIONS}
                            control={control}
                            requiredMessage="Class is required"
                        />
                        {errors.classes && <span className="error-message">{errors.classes.message}</span>}
                    </div>
                    <div className="student-gender item">
                        <DropdownSelect
                            name="gender"
                            label="Gender"
                            options={GENDER_OPTIONS}
                            control={control}
                            requiredMessage="Gender is required"
                        />
                        {errors.gender && <span className="error-message">{errors.gender.message}</span>}
                    </div>
                </div>
                <div className="form-body-item">
                    <div className="student-email item">
                        <p className="item-title">Email</p>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Email is required" }}
                            render={({ field }) => <Input {...field} className="primary" type="email" />}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>
                    <div className="student-phone item">
                        <p className="item-title">Phone</p>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: "Phone is required" }}
                            render={({ field }) => <Input {...field} className="primary" type="text" />}
                        />
                        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                    </div>
                </div>
                <div className="form-body-item">
                    <div className="student-password item">
                        <p className="item-title">Password</p>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field }) => <Input {...field} className="primary" type="password" />}
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>
                    <div className="student-age item">
                        <p className="item-title">Age</p>
                        <Controller
                            name="age"
                            control={control}
                            rules={{
                                required: "Age is required",
                            }}
                            render={({ field }) => <Input {...field} className="primary" type="text" />}
                        />
                        {errors.age && <span className="error-message">{errors.age.message}</span>}
                    </div>
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
                     className="btn-primary"
                     title="Add Student"
                     buttonType="submit"
                     disabled={!isValid || !isDirty}
                />
            </div>
        </form>
    );
};

export default StudentForm;
