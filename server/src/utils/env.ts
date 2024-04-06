// env
import dotenv from "dotenv";
import { z } from "zod";
import process from "process";
import path from "path";
import { CorsOptions } from "cors";
dotenv.config();

// get .env
const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_NAME: z.string().default("test"),
  SECRET_KEY: z.string().default("SECRET_KEY"),
  PORT: z.string().default("3001"),
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  CLIENT_URL: z.string().default("*"),
  PASS_KEY: z.string().min(4).max(4).default("1234"),
});

export const {
  DATABASE_URL,
  NODE_ENV,
  PORT,
  SECRET_KEY,
  CLIENT_URL,
  DATABASE_NAME,
  PASS_KEY,
} = envSchema.parse(process.env);

// set some global vars
export const DEV_MODE = NODE_ENV === "development";
export const PRD_MODE = NODE_ENV === "production";
export const CURRENT_DIR = process.cwd();
export const PUBLIC_DIR = path.join(CURRENT_DIR, "public");

// set cors
export const CORS_OPTIONS: CorsOptions = {
  credentials: true,
  origin: CLIENT_URL,
};
