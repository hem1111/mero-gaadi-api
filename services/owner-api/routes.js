import controller from './controller.js';
import express from 'express';
import authHandler from '../../middlewares/authHandler.js';

export default function ownerRouter() {
    const router = express.Router();

    router.get("", authHandler().handle, controller().getOwner);
    router.post("/login", controller().login);
    router.post("/signup", controller().createOwner);
    router.post("/forgot-password", controller().resetPassword);
    router.put("/update", authHandler().handle, controller().updateOwner);

    return router;
}