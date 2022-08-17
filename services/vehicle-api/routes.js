import controller from "./controller.js";
import express from "express";

export default function vehicleRouter() {
  const router = express.Router();

  router.get("", controller().listOwnerVehicles);
  router.post("", controller().addVehicle);
  router.get("/:id", controller().getVehicleDetails);
  router.put("/:id", controller().updateVehicleDetails);
  router.delete("/:id", controller().deleteVehicle);

  return router;
}
