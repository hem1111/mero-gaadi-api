import controller from "./controller.js";
import express from "express";
import { uploadImage } from "../../utils/fileUploader.js";

export default function vehicleRouter() {
  const router = express.Router();

  router.get("", controller().listOwnerVehicles);
  router.post("", uploadImage, controller().addVehicle);
  router.get("/:id", controller().getVehicleDetails);
  router.put("/:id", uploadImage, controller().updateVehicleDetails);
  router.delete("/:id", controller().deleteVehicle);

  return router;
}
