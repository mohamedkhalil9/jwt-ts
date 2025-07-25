import nodemailer from "nodemailer";
import AppError from "./appError.ts";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email: string, subject: string, template: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: template,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new AppError("Failed to send email", 500);
  }
};

const sendResetPasswordEmail = (email: string, otp: string) => {
  const resetPasswordTemplate = `${otp}`;
  sendEmail(email, "Reset Password", resetPasswordTemplate);
};

const sendVerifyEmail = (email: string, token: string) => {
  const verifyEmailTemplate = `${token}`;
  sendEmail(email, "Verify Email", verifyEmailTemplate);
};
