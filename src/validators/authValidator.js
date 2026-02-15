const validateSignup = (data) => {
    const errors = [];
    if (!data.name || data.name.trim().length === 0) {
        errors.push("Name is required");
    }
    if (!data.email.includes('@')) {
        errors.push("Invalid email Format");
    }
    if (data.password.length < 8) {
        errors.push("Password too short");
    }
    if (data.role && !["user", "seller", "admin"].includes(data.role)) {
        errors.push("Invalid role provided");
    }
    return errors;
};
module.exports = validateSignup;