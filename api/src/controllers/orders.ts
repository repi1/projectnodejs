/** @format */

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";
// import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";

export const orderController = {
  //   async getCartsByUserId(req: ReqUser, res: Response, next: NextFunction) {
  //     try {
  //       const carts = await prisma.carts.findMany({
  //         include: {
  //           products: {
  //             select: {
  //               name: true,
  //               price: true,
  //               stocks: true,
  //               productPhotos: {
  //                 select: {
  //                   photoURL: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //         where: {
  //           userId: String(req.params.id),
  //         },
  //       });
  //       res.send({
  //         success: true,
  //         result: carts,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
  async newOrder(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;

      const newOrder: Prisma.OrdersCreateInput = {
        invoiceNo: `${new Date().toISOString().split("T")[0]}/${uuidv4()}`,
        users: {
          connect: {
            id: String(userId),
          },
        },
      };
      await prisma.orders.create({
        data: newOrder,
      });
      res.send({
        success: true,
        message: "Order berhasil dibuat",
      });
    } catch (error) {
      next(error);
    }
  },
};
