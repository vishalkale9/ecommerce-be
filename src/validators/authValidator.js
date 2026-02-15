const validateSignup = (data) => {
    const errors = []
    if (!data.email.includes('@')) {
        errors.push("Invalid email Format");
    }
    if (data.password.length < 8) {
        errors.push("Password too short");
    }
    return errors;
}
module.exports = validateSignup;