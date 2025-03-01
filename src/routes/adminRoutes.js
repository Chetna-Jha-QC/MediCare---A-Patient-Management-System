const express = require("express");
const authenticateUser = require("../middleware/auth.middleware");
const authorizeRole = require("../middleware/role.middleware");
const{ getAllUsers, getUserById, deleteUser, getAllAppointments, deleteAppointment, generateReport } = require("../controllers/adminController");

const router = express.Router();

//Admin routes privacy-Protected routes
router.use(authenticateUser, authorizeRole(["admin"]));

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/appointments", getAllAppointments);
router.get("/report", generateReport);
router.delete("/users/:id", deleteUser);
router.delete("appointments/:id", deleteAppointment);

module.exports = router;