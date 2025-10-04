import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";

export const SECRET: string = process.env.SECRET || "";

export const EMAIL_SMTP_SECURE: boolean =
   typeof process.env.EMAIL_SMTP_SECURE === "string"
      ? ["1", "true", "yes"].includes(process.env.EMAIL_SMTP_SECURE.toLowerCase())
      : false;

export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";

export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";

export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;

export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";

export const CLIENT_HOST: string = process.env.CLIENT_HOST || "http://localhost:3001";
