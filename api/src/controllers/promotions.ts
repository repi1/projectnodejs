// /** @format */

// import { Response, Request, NextFunction } from "express";
// import { prisma } from "..";
// import { Prisma } from "@prisma/client";
// import { ReqUser, ReqEvent } from "../middlewares/auth-middleware";

// export const promotionController = {
//   async getPromotions(req: Request, res: Response, next: NextFunction) {
//     try {
//       const promotions = await prisma.promotions.findMany();

//       res.send({
//         success: true,
//         result: promotions,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async getPromotionById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const promotion = await prisma.promotions.findUnique({
//         where: {
//           id: Number(req.params.id),
//         },
//       });
//       res.send({
//         success: true,
//         result: promotion,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async addPromotion(req: ReqEvent, res: Response, next: NextFunction) {
//     try {
//       const { discount, limit, end_date, event_id } = req.body;

//       const newPromotion: Prisma.PromotionsCreateInput = {
//         discount,
//         limit,
//         end_date,
//         events: {
//           connect: {
//             id: Number(event_id),
//           },
//         },
//       };

//       await prisma.promotions.create({
//         data: newPromotion,
//       });
//       res.send({
//         success: true,
//         message: "promosi berhasil ditambahkan",
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async editPromotion(req: ReqEvent, res: Response, next: NextFunction) {
//     try {
//       const { discount, limit, end_date, event_id } = req.body;

//       const editPromotion: Prisma.PromotionsUpdateInput = {
//         discount,
//         limit,
//         end_date,
//         events: {
//           connect: {
//             id: Number(event_id),
//           },
//         },
//       };

//       await prisma.promotions.update({
//         data: editPromotion,
//         where: {
//           id: Number(req.params.id),
//         },
//       });
//       res.send({
//         success: true,
//         message: "promosi berhasil diedit",
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   //   async deleteEvent(req: Request, res: Response, next: NextFunction) {
//   //     try {
//   //       await prisma.event.delete({
//   //         where: {
//   //           id: Number(req.params.id),
//   //         },
//   //       });
//   //       res.send({
//   //         success: true,
//   //         message: "data berhasil dihapus",
//   //       });
//   //     } catch (error) {
//   //       next(error);
//   //     }
//   //   },
// };
