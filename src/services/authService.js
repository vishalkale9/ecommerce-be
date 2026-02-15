const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (plain, hashed) => {
    return await bcrypt.compare(plain, hashed);
}

const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

module.exports = { hashedPassword, comparePassword, generateToken }