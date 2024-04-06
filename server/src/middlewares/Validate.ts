import { ZodSchema } from "zod";

export default function Validate({
  body,
  params,
  query,
}: {
  params?: ZodSchema;
  query?: ZodSchema;
  body?: ZodSchema;
}): Handler {
  return (request, response, next) => {
    // params
    if (params) {
      const validation = params.safeParse(request.params);
      if (!validation.success)
        return response.status(500).json({
          error: {
            message: validation.error.message,
          },
        });
      request.params = validation.data;
    }

    // query
    if (query) {
      const validation = query.safeParse(request.query);
      if (!validation.success)
        return response.status(500).json({
          error: {
            message: validation.error.message,
          },
        });
      request.query = validation.data;
    }

    // body
    if (body) {
      const validation = body.safeParse(request.body);
      if (!validation.success)
        return response.status(400).json({
          errors: validation.error.errors,
        });
      request.body = validation.data;
    }

    // proceed
    next();
  };
}
