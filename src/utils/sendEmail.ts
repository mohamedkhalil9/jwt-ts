import nodemailer from "nodemailer";
import AppError from "./appError.ts";
import { verifyEmailTemplate, resetPassTemplate } from "./emailTemplates.ts";

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

export const sendResetPasswordEmail = (email: string, otp: string) => {
  let resetPasswordTemplate = resetPassTemplate;
  resetPasswordTemplate = resetPasswordTemplate.replace(/{{OTP_CODE}}/g, otp);
  for (let i = 0; i < 6; i++) {
    resetPasswordTemplate = resetPasswordTemplate.replace(
      `{{DIGIT_${i + 1}}}`,
      otp[i],
    );
  }
  sendEmail(email, "Reset Password", resetPasswordTemplate);
};

export const sendVerifyEmail = (email: string, token: string) => {
  const verifyTemplate = verifyEmailTemplate(token);
  sendEmail(email, "Verify Email", verifyTemplate);
};
