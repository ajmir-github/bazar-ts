import { z } from "zod";

const StateValidator = z.object({
  name: z.string(),
});

export default StateValidator;
