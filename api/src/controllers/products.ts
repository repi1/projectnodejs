/** @format */

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const productController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      const products = await prisma.products.findMany({
        include: {
          categories: {
            select: {
              name: true,
            },
          },
          productPhotos: {
            select: {
              photoURL: true,
            },
          },
        },
        where: {
          OR: [
            {
              name: {
                contains: String(name).toLowerCase(),
              },
            },
            {
              categories: {
                name: {
                  contains: String(name).toLowerCase(),
                },
              },
            },
          ],
        },
      });

      res.send({
        success: true,
        result: products,
      });
    } catch (error) {
      next(error);
    }
  },
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await prisma.products.findUnique({
        include: {
          categories: {
            select: {
              name: true,
            },
          },
          productPhotos: {
            select: {
              photoURL: true,
            },
          },
        },
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        result: product,
      });
    } catch (error) {
      next(error);
    }
  },
  //   async addEvent(req: ReqUser, res: Response, next: NextFunction) {
  //     try {
  //       const {
  //         event_name,
  //         price,
  //         description,
  //         availability,
  //         end_date,
  //         address,
  //         type,
  //         category_id,
  //         location_id,
  //         discount,
  //         limit,
  //         discount_enddate,
  //       } = req.body;

  //       console.log(req.file);

  //       const newEvent: Prisma.EventCreateInput = {
  //         event_name,
  //         image_url: req.file?.filename,
  //         price: Number(price),
  //         description,
  //         availability: Number(availability),
  //         end_date: new Date(end_date),
  //         address,
  //         type,
  //         discount: Number(discount),
  //         limit: Number(limit),
  //         discount_enddate,
  //         users: {
  //           connect: {
  //             id: req.user?.id,
  //           },
  //         },
  //         categories: {
  //           connect: {
  //             id: Number(category_id),
  //           },
  //         },
  //         locations: {
  //           connect: {
  //             id: Number(location_id),
  //           },
  //         },
  //       };

  //       await prisma.event.create({
  //         data: newEvent,
  //       });
  //       res.send({
  //         success: true,
  //         message: "data berhasil ditambahkan",
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
  async editProduct(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { name, price, weight, stocks, categoryId } = req.body;

      const editedProduct: Prisma.ProductsUpdateInput = {
        stocks: Number(stocks),
      };
      if (name) editedProduct.name = String(name);
      if (price) editedProduct.price = Number(price);
      if (weight) editedProduct.weight = Number(weight);
      // if (stocks) editedProduct.stocks = Number(stocks);
      if (categoryId)
        editedProduct.categories = { connect: { id: String(categoryId) } };

      await prisma.products.update({
        data: editedProduct,
        where: {
          id: String(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
  //   async deleteEvent(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       await prisma.event.delete({
  //         where: {
  //           id: Number(req.params.id),
  //         },
  //       });
  //       res.send({
  //         success: true,
  //         message: "data berhasil dihapus",
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
  //   async verifyUser(req: ReqUser, res: Response, next: NextFunction) {
  //     try {
  //       const { user } = req;
  //       const verif: Prisma.UserUpdateInput = {
  //         isVerified: true,
  //       };
  //       if (!user?.isVerified) throw Error("user already verified");
  //       await prisma.user.update({
  //         data: verif,
  //         where: {
  //           id: user.id,
  //         },
  //       });
  //       console.log("aman");

  //       res.send({
  //         message: "success",
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
};
