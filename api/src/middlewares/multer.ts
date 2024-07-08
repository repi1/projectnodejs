/** @format */

import multer from "multer";
import uuid from "uuid";
import moment from "moment";
import { Request } from "express";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

export const fileUploader = ({
  destinationFolder = "",
  prefix = "",
  filetype = "",
}) => {
  const storageConfig = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      console.log(file);
      const fileExtention = file.mimetype.split("/")[1];
      const type = file.mimetype.split("/")[0];
      // if(type != filetype) return cb(Error("erro"))

      const filename = `${prefix}_${moment().format(
        "YYYY-MM-DD-HH-mm-ss-SSS-" + uuid.v1()
      )}.${fileExtention}`;
      // PRODUCT_2024-02-07-11-02-03-500-2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d.png
      cb(null, filename);
    },
  });

  const uploader = multer({
    storage: storageConfig,
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (file.mimetype.split("/")[0] != filetype) {
        console.log("error");
        return cb(new Error("file bukan gambar"));
      }
      return cb(null, true);
    },
    limits: {
      fileSize: 10000000,
    },
  });
  return uploader;
};

export const blobUploader = ({ filetype = "images" }) => {
  return multer({
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (file.mimetype.split("/")[0] != filetype) {
        return cb(new Error("file melebihi size"));
      }
      return cb(null, true);
    },
    limits: {
      fileSize: 10000000,
    },
  });
};
