/** @format */

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const cartController = {
  async getCartsByUserId(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const carts = await prisma.carts.findMany({
        include: {
          products: {
            select: {
              name: true,
              productPhotos: {
                select: {
                  photoURL: true,
                },
              },
            },
          },
        },
        where: {
          userId: String(req.params.id),
        },
      });
      res.send({
        success: true,
        result: carts,
      });
    } catch (error) {
      next(error);
    }
  },
  async addToCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { userId, productId, qty } = req.body;

      const newCart: Prisma.CartsCreateInput = {
        qty: Number(qty),
        users: {
          connect: {
            id: String(userId),
          },
        },
        products: {
          connect: {
            id: String(productId),
          },
        },
      };
      await prisma.carts.create({
        data: newCart,
      });
      res.send({
        success: true,
        message: "data berhasil ditambahkan",
      });
    } catch (error) {
      next(error);
    }
  },
  async editCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { qty } = req.body;

      const editedCart: Prisma.CartsUpdateInput = { qty: Number(qty) };

      await prisma.carts.update({
        data: editedCart,
        where: {
          productId: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "Cart berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.carts.delete({
        where: {
          productId: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "Cart berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};
