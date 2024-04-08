import { initTRPC } from "@trpc/server";
import { Context } from "context";

// You can use any variable name you like.
// We use t to keep things simple.
type Meta = {
  authRequired?: boolean;
  rootRequired?: boolean;
  adminRequired?: boolean;
};

const t = initTRPC.context<Context>().meta<Meta>().create();

export const router = t.router;
export const procedure = t.procedure;
// export const onlyAdmin = t.middleware(({ ctx, next }) => {
//   if (!ctx.isAdmin) throw new TRPCError({ code: "UNAUTHORIZED" });
//   return next({ ctx });
// });
// export const privateProcedure = t.procedure.use(onlyAdmin);
