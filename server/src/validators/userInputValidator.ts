import { Role } from "@prisma/client";
import { z } from "zod";
// user
export const UserInputValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  verified: z.boolean(),
  role: z.nativeEnum(Role),
});

export default UserInputValidator;
