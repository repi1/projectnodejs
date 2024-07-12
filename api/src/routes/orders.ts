/** @format */

import express, { Router } from "express";
import { orderController } from "../controllers/orders";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import { fileUploader } from "../middlewares/multer";
export const route: Router = express.Router();

// route.get("/:id", cartController.getCartsByUserId);
// route.patch("/:id", cartController.editCart);

// route.patch("/verify/", verifyUser, productController.verifyUser);

route.post("/", orderController.newOrder);

// route.delete("/:id", cartController.deleteCart);
