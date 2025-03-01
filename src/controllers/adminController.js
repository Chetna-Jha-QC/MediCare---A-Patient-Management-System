const User = require("../models/User");
const Appointment = require("../models/Appointment");
const { createObjectCsvWriter } = require ("csv-writer");

//task1. get all the users
const getAllUsers = async (req, res) => {
    try {
    const users = await User.find();
res.status(200).json(users);
    } catch (error){
        res.status(500).json({ message: "Error", error: error.message});
    }
};

//task2. get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({message: "user not found"});
        res.status(200).json(user);
    } catch (error){
        res.status(500).json({message: "Error"});
    }
};

//task3 deleteusr byid
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({message: "user not found"});
        res.status(200).json({message: "user deleted"});
    } catch (error) {
        res.status(500).json({message:"eroor taskcannot be completed at moment"});
    }
};


//Appointments
//task4. getting all appointments
const getAllAppointments = async (req, res) => {
try{
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
} catch (error) {
    res.status(500).json({message: "Error, try later", error: error.message });
}
};

//task5. delete an appointment
const deleteAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if(!appointment )
            return res.status(404).json({message: "Error: not found"});

        res.status(200).json({message: "Appoinmemt Deleted Sucessfully"});
    } catch (error) {
        res.status(500).json({message: "Error in deleting appointment", error: error.message});
    }
};

//generatiing CSV
const generateReport = async (req, res) => {
    try {
        const totalDoctors = await User.countDocuments({ role: "doctor"});
        const totalPatients = await User.countDocuments({ role: "Patient"});
        const totalAppointments = await Appointment.countDocuments();

        const csvWriter = createObjectCsvWriter({
            path: "src/utlis/report.csv",
            header: [
                {id: "totalDoctors", title: "Total Doctors" },
                {id: "totalPatients", title: "Total Patients" },
                {id: "totalAppointments", title: "Total Appointments" },
            ],
        });

        await csvWriter.writeRecords([{ totalDoctors, totalPatients, totalAppointments}]);

        res.download("report");
    } catch (error){
        res.status(500).json({message: "Error", error: error.message});
    }
};

module.exports = {getAllUsers, getAllAppointments, getUserById, deleteAppointment, deleteUser, generateReport };