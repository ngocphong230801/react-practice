const REGEX = {
    // Check name format
    name: /^[a-zA-ZÀ-ỹ\s]*$/,

    // Check email format
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Check phone format
    phone: /^(0)+[3|5|7|8|9]+([0-9]{8})$/,
};

export default REGEX
