import { vehicleModel } from "./model.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";

export default function vehicleController() {
  const listOwnerVehicles = asyncHandler(async (req, res, next) => {
    const vehicles = await vehicleModel
      .find({ ownerId: req.context.ownerId })
      .sort({ updatedAt: "desc" })
      .exec();
    if (!vehicles) {
      const error = new Error("error to list vehicles");
      error.statusCode = 500;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  });

  const addVehicle = asyncHandler(async (req, res, next) => {
    const vehicleInput = new vehicleModel(req.body);
    vehicleInput.ownerId = req.context.ownerId;

    if (req?.file?.path) vehicleInput.image = req?.file?.path;

    const vehicle = await vehicleModel.create(vehicleInput);
    if (!vehicle) {
      const error = new Error("error adding vehicle");
      error.statusCode = 500;
      return next(error);
    }

    res.status(201).json({
      success: true,
      data: "vehicle created",
    });
  });

  const getVehicleDetails = asyncHandler(async (req, res, next) => {
    const vehicle = await vehicleModel.findById(req.params.id).exec();
    if (!vehicle) {
      const error = new Error("vehicle not found");
      error.statusCode = 404;
      return next(error);
    }

    if (vehicle.ownerId.toString() !== req.context.ownerId) {
      const error = new Error("you are forbidden to access");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  });

  const updateVehicleDetails = asyncHandler(async (req, res, next) => {
    const vehicleInput = new vehicleModel(req.body);

    const vehicleId = req.params.id;

    const vehicle = await vehicleModel.findById(vehicleId).exec();
    if (!vehicle) {
      const error = new Error("vehicle not found");
      error.statusCode = 404;
      return next(error);
    }

    if (vehicle.ownerId.toString() !== req.context.ownerId) {
      const error = new Error("you are forbidden");
      error.statusCode = 403;
      return next(error);
    }

    vehicleInput._id = vehicleId;
    vehicleInput.ownerId = vehicle.ownerId;
    vehicleInput.createdAt = vehicle.createdAt;

    if (req?.file?.path) vehicleInput.image = req?.file?.path;
    else vehicleInput.image = vehicle.image;

    const vehicleUpdated = await vehicleModel.replaceOne(
      { _id: req.params.id },
      vehicleInput
    );
    if (!vehicleUpdated) {
      const error = new Error("error updating vehicle");
      error.statusCode = 500;
      return next(error);
    }

    res.status(201).json({
      success: true,
      data: "vehicle updated",
    });
  });

  const deleteVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await vehicleModel
      .findOneAndDelete({ _id: req.params.id })
      .exec();
    if (!vehicle) {
      const error = new Error("error deleting vehicle");
      error.statusCode = 500;
      return next(error);
    }

    res.status(204).json({
      success: true,
      data: "vehicle deleted",
    });
  });

  return {
    listOwnerVehicles,
    addVehicle,
    getVehicleDetails,
    updateVehicleDetails,
    deleteVehicle,
  };
}
