import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@/utils/env";

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY) as { userId: string } & jwt.JwtPayload;
}
export function signToken(data: { userId: string }): string {
  return jwt.sign(data, SECRET_KEY);
}
