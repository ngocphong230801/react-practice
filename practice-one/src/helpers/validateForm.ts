export const validationRules = {
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
                    return "Password >= 8 characters & include a letter.";
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
        validate: {
            validAge: (value: number) => {
                const age = parseInt(String(value), 10);
                if (isNaN(age)) {
                    return "Age must be a number";
                }
            },
        },
    },
};
