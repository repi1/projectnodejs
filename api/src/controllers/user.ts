/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from ".."; //accessing model
import { Prisma } from "@prisma/client"; // accessing interface/types
import { v4 as uuidv4 } from "uuid";
import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { ReqUser } from "../middlewares/auth-middleware";
import { mailer, transport } from "../lib/nodemailer";
import mustache, { render } from "mustache";
import fs from "fs";

type TUser = {
  email: string;
};

const template = fs
  .readFileSync(__dirname + "/../templates/verify.html")
  .toString();

export const userController = {
  async getUserById(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const users = await prisma.users.findUnique({
        where: {
          id: String(req.params.id),
        },
      });

      res.send({
        success: true,
        result: users,
      });
    } catch (error) {
      next(error);
    }
  },
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, gender } = req.body;
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UsersCreateInput = {
        name,
        email,
        password: hashedPassword,
      };

      const checkUser = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.id) throw Error("user sudah terdaftar");

      await prisma.users.create({
        data: newUser,
      });

      const token = sign({ email }, secretKey, {
        expiresIn: "1hr",
      });

      const rendered = mustache.render(template, {
        email,
        name: name + " ",
        verify_url: process.env.verifyURL + token,
      });

      mailer({
        to: email,
        subject: "Verify Account",
        text: "",
        html: rendered,
      });

      res.send({
        success: true,
        message: "berhasil register",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;

      const user = await prisma.users.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!user) throw Error("email/password salah");
      const checkPassword = await compare(String(password), user.password);
      const resUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "1hr",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
      // npm i jsonwebtoken @types/jsonwebtoken
      throw Error("email/password tidak sesuai");
    } catch (error) {
      next(error);
    }
  },
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;

      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);
      const userEditPassword: Prisma.UsersUpdateInput = {
        password: hashedPassword,
      };
      await prisma.users.update({
        data: userEditPassword,
        where: {
          email: String(email),
        },
      });
      res.send({
        success: true,
        message: "berhasil merubah password",
      });
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.users.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("unauthorized 2");

      const token = sign(checkUser, secretKey, {
        expiresIn: "1hr",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async verifyEmail(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const verif: Prisma.UsersUpdateInput = {
        isVerified: true,
      };
      if (user?.isVerified) throw Error("user already verified");
      await prisma.users.update({
        data: verif,
        where: {
          id: user?.id,
        },
      });
      console.log("User is now verified!");

      res.send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;

      const rendered = mustache.render(template, {
        email,
        verify_url: "",
      });

      mailer({
        to: String(email),
        subject: "verify account",
        text: "",
        html: rendered,
      });

      res.send({
        message: "email berhasil dikirim",
      });
    } catch (error) {
      next(error);
    }
  },
  async editUser(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { email, name, birthDate } = req.body;

      const editedUser: Prisma.UsersUpdateInput = {
        email,
        name,
        // birthDate,
        avatarURL: req.file?.filename,
      };

      await prisma.users.update({
        data: editedUser,
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
};
