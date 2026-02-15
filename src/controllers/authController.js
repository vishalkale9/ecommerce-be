const User = require("../models/userModel")
const authService = require("../services/authService")

const validateSignup = require("../validators/authValidator");

exports.signup = async (req, res) => {
    try {
        // Run validation
        const errors = validateSignup(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ status: "fail", errors });
        }

        const { name, email, password, role } = req.body;

        const hashedPassword = await authService.hashedPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword, role });
        const token = await authService.generateToken(newUser._id);
        res.status(201).json({ message: "User created successfully", token, data: { user: newUser } })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await authService.comparePassword(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        const token = await authService.generateToken(user._id);
        res.status(200).json({ message: "User logged in successfully", token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}