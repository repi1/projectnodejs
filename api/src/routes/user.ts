/** @format */
import { Response, Request, NextFunction } from "express";
import { verifyUser } from "../middlewares/auth-middleware";
import express, { Router } from "express";
import { userController } from "../controllers/user";
import { fileUploader } from "../middlewares/multer";

export const route: Router = express.Router();
route.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
    next();
  },
  userController.login
);

route.get("/keep-login", userController.keepLogin);
route.get("/:id", userController.getUserById);
route.patch(
  "/:id",
  // verifyUser,
  fileUploader({
    destinationFolder: "/profile_images",
    prefix: "PROFILE",
    filetype: "image",
  }).single("image"),
  userController.editUser
);
route.patch("/verify", verifyUser, userController.verifyEmail);
route.post("/", userController.register);
route.patch("/", verifyUser, userController.forgotPassword);
