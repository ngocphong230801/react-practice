// react
import React, {useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form';

// css
import "./Form.css";

// components
import Button from "../common/Button";
import Input from "../common/Input";
import DropdownSelect from "../DropDown";

// helpers
import { uploadImage } from "@helpers/uploadImage";
import { VALIDATION_RULES } from "@constants/validateForm";

// constants
import { GENDER_OPTIONS, CLASS_OPTIONS } from "@constants/dropdownData";
import { close } from "@assets/icon";

// service
import { addStudentToAPI } from "@service/api";

export interface StudentFormProps {
    closeForm: () => void;
    onStudentAdd: () => void;
}

export interface IFormInput {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
    classes: string;
    age: number;
}

const defaultFormValues = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    classes: '',
    age: 17,
};


const StudentForm: React.FC<StudentFormProps> = ({ closeForm, onStudentAdd }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, dirtyFields, isSubmitting, isValid  }
    } = useForm<IFormInput>({
        defaultValues: defaultFormValues,
        mode: 'onChange'
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async (data: IFormInput) => {
        let uploadedImageUrl = null;
        if (imageFile) {
            try {
                const uploadResult = await uploadImage(imageFile);
                uploadedImageUrl = uploadResult.data;
            } catch (error) {
                console.error("Error uploading image:", error);
                setErrorMessage("Failed to upload image. Please try again.");
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
            } else {
                console.error("Failed to add student");
                setErrorMessage("Failed to add student. Please try again.");
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            setImageFile(null);
            setImagePreviewUrl('');
            return;
        }
    
        const validFormats = ['image/jpeg', 'image/png'];
        const maxFileSize = 5 * 1024 * 1024;
    
        if (!validFormats.includes(file.type)) {
            setErrorMessage("Invalid file format. Only PNG and JPG are allowed.");
            setImageFile(null);
            setImagePreviewUrl('');
            return;
        }
    
        if (file.size > maxFileSize) {
            setErrorMessage(`File is too large. Maximum size allowed is ${maxFileSize / 1024 / 1024}MB.`);
            setImageFile(null);
            setImagePreviewUrl('');
            return;
        }
    
        setErrorMessage('');
        setImageFile(file);
        setImagePreviewUrl(URL.createObjectURL(file));
    };
    
    const isAnyFieldDirty = Object.keys(dirtyFields).length > 0;

    const handleReset = () => {
        reset(defaultFormValues);
        setImageFile(null);
        setImagePreviewUrl('');
        setErrorMessage('');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="studen-form">
            <img src={close} alt="icon-close" className="icon-close" onClick={closeForm} />
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
                            rules={VALIDATION_RULES.name}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isSubmitting}
                                    className="default"
                                    type="text"
                                    placeholder="Please enter name student"
                                    error={errors.name ? errors.name.message : null}
                                />
                            )}
                        />
                    </div>
                    <div className="student-class item">
                        <DropdownSelect
                            name="classes"
                            label="Class"
                            disabled= {isSubmitting}
                            options={CLASS_OPTIONS}
                            control={control}
                            requiredMessage="Please choose class"
                            error={errors.classes ? errors.classes.message : null}
                        />
                    </div>
                    <div className="student-gender item">
                        <DropdownSelect
                            name="gender"
                            label="Gender"
                            disabled= {isSubmitting}
                            options={GENDER_OPTIONS}
                            control={control}
                            requiredMessage="Please choose gender"
                            error={errors.gender ? errors.gender.message : null}
                        />
                    </div>
                </div>
                <div className="form-body-item">
                    <div className="student-email item">
                        <p className="item-title">Email</p>
                        <Controller
                            name="email"
                            control={control}
                            rules={VALIDATION_RULES.email}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    type="email"
                                    disabled={isSubmitting}
                                    placeholder="Please enter email student"
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
                            rules={VALIDATION_RULES.phone}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    disabled={isSubmitting}
                                    type="text"
                                    placeholder="Please enter phone number student"
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
                            rules={VALIDATION_RULES.password}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    disabled={isSubmitting}
                                    type="password"
                                    placeholder="Please enter password student"
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
                            rules={VALIDATION_RULES.age}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    disabled={isSubmitting}
                                    type="text"
                                    placeholder="Please enter age student"
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
                {errorMessage && <span className="error-message image-error">{errorMessage}</span>}
                <div className="btn-action">
                    <Button
                        className="btn-primary reset-form"
                        title="Reset Form"
                        onClick={handleReset}
                        disabled={!isAnyFieldDirty}
                    />
                    <Button
                        className="btn-default add-student"
                        title={isSubmitting ? "Adding..." : "Add Student"}
                        buttonType="submit"
                        disabled={isSubmitting || !isValid || !imageFile}
                    />
                </div>
            </div>
        </form>
    );
};

export default StudentForm;
