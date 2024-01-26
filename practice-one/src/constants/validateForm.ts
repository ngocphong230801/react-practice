
export const VALIDATION_RULES = {
    name: {
        required: "Name is blank",
        maxLength: {
            value: 30,
            message: "Name must be no more than 30 characters"
        },
        pattern: {
            value: /^[A-Za-z ]+$/,
            message: "Name must not contain numbers",
        },
    },
    password: {
        required: "Password is blank",
        validate: {
            validPassword: (value: string) => {
                const hasValidLength = value.length >= 8;
                const hasLetter = /[a-zA-Z]/.test(value);

                if (!hasValidLength || !hasLetter) {
                    return "Password at least eight characters and include a letter ";
                }

                return true;
            },
        },
    },
    email: {
        required: "Email is blank",
        pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Invalid email format.",
        },
    },
    phone: {
        required: "Phone is blank",
        pattern: {
            value: /^0[0-9]{9}$/,
            message: "Phone number must be 10 digits and start with 0",
        },
    },
    age: {
        required: "Age is blank",
        pattern: {
            value: /^(1[0-9]|[2-9][0-9]|100)$/,
            message: "Age must be a number and between 10 and 100",
        },
    },
};
