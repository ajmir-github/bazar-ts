import { Status } from "@prisma/client";
import { z } from "zod";

const ItemValidator = z.object({
  name: z.string().min(3),
  description: z.string(),
  userId: z.string(),
  postId: z.string(),
  stateId: z.string(),
  categoryId: z.string(),
  price: z.number().nonnegative(),
  previousPrice: z.number().nonnegative().optional(),
  status: z.nativeEnum(Status),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  sold: z.boolean().optional(),
  soldAt: z.date().optional(),
});

export default ItemValidator;
