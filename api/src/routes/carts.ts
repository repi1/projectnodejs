/** @format */

import express, { Router } from "express";
import { cartController } from "../controllers/carts";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import { fileUploader } from "../middlewares/multer";
export const route: Router = express.Router();

route.get("/:id", cartController.getCartsByUserId);
route.patch("/:id", cartController.editCart);

// route.patch("/verify/", verifyUser, productController.verifyUser);

route.post("/", cartController.addToCart);

route.delete("/:id", cartController.deleteCart);
