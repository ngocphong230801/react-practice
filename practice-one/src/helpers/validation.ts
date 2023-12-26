import REGEX from "../constants/regex";

export const isValidName = (name: string) => {
    const regexName = REGEX.name;
    return regexName.test(name);
}

export const isValidEmail = (email: string) => {
    const regexEmail = REGEX.email;
    return regexEmail.test(email);
};


export const isValidPhone = (phone: string) => {
    const regexPhone = REGEX.phone;
    return regexPhone.test(phone);
};


export const isValidPassworld = (passworld: string) => {
    const regexPassword = REGEX.password;
    return regexPassword.test(passworld);
}
