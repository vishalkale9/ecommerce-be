const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Ecommerce API" });
});

app.use("/api/v1/auth", authRoutes);

// 404 Handler
// app.all("/*", (req, res) => {
//     res.status(404).json({
//         status: "fail",
//         message: `Can't find ${req.originalUrl} on this server!`
//     });
// });

module.exports = app;


