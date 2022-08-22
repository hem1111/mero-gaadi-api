import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "owners",
  },
  currentDriver: String,
  number: String,
  type: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const vehicleModel = new mongoose.model("vehicle", VehicleSchema);

const VehicleTravelSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "vehicle",
  },
  lat: String,
  lng: String,
  dateAndTime: String,
});

export const vehicleTravelModel = new mongoose.model(
  "vehicle_travel",
  VehicleTravelSchema
);
