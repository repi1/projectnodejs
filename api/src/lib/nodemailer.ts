/** @format */

import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  auth: {
    user: process.env.nodemailer_email,
    pass: process.env.nodemailer_password,
  },
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
});

export type mailer = {
  subject: string | undefined;
  html: string | undefined;
  to: string | undefined;
  text: string | undefined;
};

export const mailer = async ({ subject, html, to, text }: mailer) => {
  try {
    await transport.sendMail({
      subject: String(subject) || "testing",
      html: String(html) || "<h1> send through api </h1>",
      to: String(to) || "udin@gmail.com",
      text: String(text) || "hello ridwan",
    });
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error(error);
  }
};

// mailer({ subject: "welcome", html: "", to: "test@mal.com", text: "hello" });
