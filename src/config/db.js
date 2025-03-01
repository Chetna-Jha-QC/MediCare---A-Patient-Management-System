const mongoose = require("mongoose");

const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log ("Mongo DB Connection Successful");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectToDB;