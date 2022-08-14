import mongoose from "mongoose";

const GaadiSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'owners'
    },
    currentDriverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drivers'
    },
    number: Number,
    type: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export const gaadiModel = new mongoose.model("gaadi", GaadiSchema);