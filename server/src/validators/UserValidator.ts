import { Role } from "@prisma/client";
import { z } from "zod";
// user
const UserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
  verified: z.boolean().optional(),
  role: z.nativeEnum(Role).optional(),
  stateId: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  whatsup: z.string().optional(),
});

export default UserValidator;
