import { Rating } from "@prisma/client";
import { z } from "zod";

const CommentValidator = z.object({
  comment: z.string(),
  rating: z.nativeEnum(Rating),
  postId: z.string(),
  userId: z.string(),
});

export default CommentValidator;
