const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swagger");

const specs = swaggerJsDoc(swaggerOptions);

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// This is the endpoint where your documentation will live
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Ecommerce API" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

// 404 Handler
// app.all("/*", (req, res) => {
//     res.status(404).json({
//         status: "fail",
//         message: `Can't find ${req.originalUrl} on this server!`
//     });
// });

module.exports = app;


