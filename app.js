const express = require('express');
const connectToDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require("./src/routes/adminRoutes");

require("dotenv").config();

const app = express();
//middleare
app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);





module.exports = app;