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
    age: number;
}

const StudentForm: React.FC<StudentFormProps> = ({ closeForm, onStudentAdd }) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>({ mode: 'onChange' });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: IFormInput) => {
        let uploadedImageUrl = null;
        if (imageFile) {
            try {
                const uploadResult = await uploadImage(imageFile);
                setIsSubmitting(true);
                uploadedImageUrl = uploadResult.data;
            } catch (error) {
                console.error("Error uploading image:", error);
                setErrorMessage("Failed to upload image. Please try again.");
                setIsSubmitting(false);
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
                setErrorMessage("Failed to add student. Please try again.");
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
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
                            rules={{
                                required: "Name is required",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="default"
                                    type="text"
                                    error={errors.name ? errors.name.message : null}
                                />
                            )}
                        />
                    </div>
                    <div className="student-class item">
                        <DropdownSelect
                            name="classes"
                            label="Class"
                            options={CLASS_OPTIONS}
                            control={control}
                            requiredMessage="Please choose class"
                        />
                        {errors.classes && <span className="error-message">{errors.classes.message}</span>}
                    </div>
                    <div className="student-gender item">
                        <DropdownSelect
                            name="gender"
                            label="Gender"
                            options={GENDER_OPTIONS}
                            control={control}
                            requiredMessage="Please choose gender"
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
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
                                    message: "Invalid email format. Only @gmail.com addresses are allowed.",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    type="email"
                                    error={errors.email ? errors.email.message : null}
                                />
                            )}
                        />
                    </div>
                    <div className="student-phone item">
                        <p className="item-title">Phone</p>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Phone is required",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    type="text"
                                    error={errors.phone ? errors.phone.message : null}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="form-body-item">
                    <div className="student-password item">
                        <p className="item-title">Password</p>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                validate: {
                                    validPassword: (value) => {
                                        const hasValidLength = value.length >= 8;
                                        const hasLetter = /[a-zA-Z]/.test(value);

                                        if (!hasValidLength || !hasLetter) {
                                            return "Ex: 23082001a";
                                        }

                                        return true;
                                    },
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    type="password"
                                    error={errors.password ? errors.password.message : null}
                                />
                            )}
                        />
                    </div>

                    <div className="student-age item">
                        <p className="item-title">Age</p>
                        <Controller
                            name="age"
                            control={control}
                            rules={{
                                required: "Age is required",
                                validate: {
                                    validAge: (value) => {
                                        const age = parseInt(String(value), 10);
                                        if (isNaN(age)) {
                                            return "Age must be a number";
                                        }
                                        if (age < 15 || age > 20) {
                                            return "Age must be between 15 and 20";
                                        }
                                        return true;
                                    },
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    type="text"
                                    error={errors.age ? errors.age.message : null}
                                />
                            )}
                        />
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
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <Button
                    className="btn-primary"
                    title="Add Student"
                    buttonType="submit"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
};

export default StudentForm;
