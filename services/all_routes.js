import authHandler from "../middlewares/authHandler.js";
import ownerRouter from "./owner-api/routes.js";
import vehicleRouter from "./vehicle-api/routes.js";

export default function routes(app) {
  app.use("/owners", ownerRouter());

  app.use("/vehicles", authHandler().handle, vehicleRouter());
}
