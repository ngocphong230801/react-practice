// react
import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form';

// css
import "./Form.css";

// components
import Button from "../common/Button";
import Input from "../common/Input";
import DropdownSelect from "../DropDown";

// helpers
import { uploadImage } from "@helpers/uploadImage";
import { validationRules } from "@helpers/validateForm";

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

const StudentForm: React.FC<StudentFormProps> = ({ closeForm, onStudentAdd }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid, dirtyFields }
    } = useForm<IFormInput>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            gender: '',
            password: '',
            classes: '',
            age: 17,
        },
        mode: 'onChange'
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imageError, setImageError] = useState<string>('');

    useEffect(() => {
        setIsFormValid(isValid);
    }, [isValid]);

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

        if (Object.keys(errors).length > 0) {
            setErrorMessage("Please fill out all required fields.");
            return;
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
            const validFormats = ['image/jpeg', 'image/png'];
            const maxFileSize = 5 * 1024 * 1024;

            if (!validFormats.includes(file.type)) {
                setImageError("Invalid file format. Only PNG and JPG are allowed.");
                setIsImageSelected(false);
            } else if (file.size > maxFileSize) {

                setImageError(`File is too large. Maximum size allowed is ${maxFileSize / 1024 / 1024}MB.`);
                setIsImageSelected(false);
            } else {
                setImageError('');
                setImageFile(file);
                setImagePreviewUrl(URL.createObjectURL(file));
                setIsImageSelected(true);
            }
        } else {
            setIsImageSelected(false);
        }
    };

    const isAnyFieldDirty = Object.keys(dirtyFields).length > 0;

    const handleReset = () => {
        reset({
            name: '',
            email: '',
            phone: '',
            gender: '',
            password: '',
            classes: '',
            age: 17,
        });
        setImageFile(null);
        setImagePreviewUrl('');
        setErrorMessage('');
        setImageError('');
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
                            rules={validationRules.name}
                            render={({ field }) => (
                                <Input
                                    {...field}
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
                            rules={validationRules.email}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
                                    type="email"
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
                            rules={validationRules.phone}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
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
                            rules={validationRules.password}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
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
                            rules={validationRules.age}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="primary"
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
                {errorMessage && <span className="error-message">{errorMessage}</span>}
                {imageError && <span className="error-message image-error">{imageError}</span>}

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
                        disabled={!isFormValid || isSubmitting || !isImageSelected}
                    />
                </div>

            </div>
        </form>
    );
};

export default StudentForm;
