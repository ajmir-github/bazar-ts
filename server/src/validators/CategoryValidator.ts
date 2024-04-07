import { z } from "zod";

const CategoryValidator = z.object({
  name: z.string(),
  image: z.string().optional(),
});

export default CategoryValidator;
