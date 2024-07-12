/** @format */

import express, {
  Application,
  Response,
  Request,
  NextFunction,
  request,
} from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import cors from "cors";
import { config } from "dotenv";
import multer from "multer";
config();

export const prisma = new PrismaClient();

export const secretKey = String(process.env.secretKey);
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/images/event_images/",
  express.static(`${__dirname}/public/images/event_images`)
);

const PORT = process.env.PORT;

//routes
app.use("/users", routes.userRoutes);
app.use("/products", routes.productRoutes);
app.use("/carts", routes.cartRoutes);
app.use("/orders", routes.orderRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
}); //error handler

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found"); //page not found handler
});

//test
app.get("/test", (req: Request, res: Response) => {
  res.send("hello world!");
});

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "/public");
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/api/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    res.json(req.file);
  }
);

app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
