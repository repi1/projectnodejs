// /** @format */

// import { Response, Request, NextFunction } from "express";
// import { prisma } from "..";
// import { Prisma } from "@prisma/client";
// import { ReqUser } from "../middlewares/auth-middleware";
// import { v4 as uuidv4 } from "uuid";

// export const transanctionController = {
//   async getTransactionsbyUserId(
//     req: ReqUser,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const transanctions = await prisma.transactions.findMany({
//         include: {
//           users: {
//             select: {
//               id: true,
//               email: true,
//               name: true,
//             },
//           },
//           events: {
//             select: {
//               event_name: true,
//               price: true,
//               discount: true,
//               image_url: true,
//             },
//           },
//         },
//         where: {
//           user_id: Number(req.params.id),
//           // user_id: req.user?.id,
//         },
//       });
//       res.send({
//         success: true,
//         log: Number(req.user?.id),
//         result: transanctions,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async getTransactionById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const transaction = await prisma.transactions.findUnique({
//         include: {
//           users: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//           events: {
//             select: {
//               event_name: true,
//               price: true,
//               discount: true,
//             },
//           },
//         },
//         where: {
//           id: Number(req.params.id),
//         },
//       });

//       res.send({
//         success: true,
//         result: transaction,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   async addTransaction(req: ReqUser, res: Response, next: NextFunction) {
//     try {
//       const invoice_no = uuidv4();
//       const { qty, total, rating, review, event_id } = req.body;
//       let events = {
//         connect: {
//           id: req.body?.event_id,
//         },
//       };
//       console.log(req.body);

//       const newTransaction: Prisma.TransactionsCreateInput = {
//         invoice_no: invoice_no,
//         qty: Number(qty),
//         total: Number(total),
//         rating: Number(rating),
//         review,
//         users: {
//           connect: {
//             id: req.user?.id,
//           },
//         },
//         events: {
//           connect: {
//             id: Number(event_id),
//           },
//         },
//       };

//       console.log(newTransaction);

//       await prisma.transactions.create({
//         data: newTransaction,
//       });
//       res.send({
//         success: true,
//         message: "data berhasil ditambahkan",
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   // async editTransaction(req: ReqUser, res: Response, next: NextFunction) {
//   //   try {
//   //     const {
//   //       event_name,
//   //       price,
//   //       description,
//   //       availability,
//   //       end_date,
//   //       address,
//   //       type,
//   //     } = req.body;
//   //     const editEvent: Prisma.EventUpdateInput = {
//   //       event_name,
//   //       image_url: req.file?.filename,
//   //       price: Number(price),
//   //       description,
//   //       availability: Number(availability),
//   //       end_date: new Date(end_date),
//   //       address,
//   //       type,
//   //       users: {
//   //         connect: {
//   //           id: req.user?.id,
//   //         },
//   //       },
//   //       categories: {
//   //         connect: {
//   //           id: req.body?.category_id,
//   //         },
//   //       },
//   //       locations: {
//   //         connect: {
//   //           id: req.body?.location_id,
//   //         },
//   //       },
//   //       promotions: {
//   //         connect: {
//   //           id: req.body?.promotions_id,
//   //         },
//   //       },
//   //     };
//   //     console.log(req.file);

//   //     await prisma.event.update({
//   //       data: editEvent,
//   //       where: {
//   //         id: Number(req.params.id),
//   //       },
//   //     });
//   //     res.send({
//   //       success: true,
//   //       message: "data berhasil diedit",
//   //     });
//   //   } catch (error) {
//   //     next(error);
//   //   }
//   // },
//   async deleteTransaction(req: Request, res: Response, next: NextFunction) {
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
// };
