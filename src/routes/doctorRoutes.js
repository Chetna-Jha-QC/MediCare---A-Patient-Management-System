const express = require ("express");
const authenticateUser = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");
const {getDocAppointment, updateAppointment } = require("../controllers/doctorController");

const router = express.Router();

router.use(authenticateUser, authorizeRole(["doctor"]));

router.get("/appointments")