const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appointmentDateTime: {type: Date, required: true },
    symptoms: { type: String, required: true },
    fees: { type: Number, default: 0 },
    isDiagnosisisDone: { type: Boolean, default: false },
});

module.exports = mongoose.model("Appointment", appointmentSchema);