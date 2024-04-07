import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "context";

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const onlyAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx });
});
export const privateProcedure = t.procedure.use(onlyAdmin);
