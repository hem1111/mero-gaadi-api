import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    driverPhoto: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: String,
    contactNumber: String,
    licenseNumber: {
        type: String,
        required: true
    },
    licensePhoto: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export const driverModel = new mongoose.model("drivers", DriverSchema);