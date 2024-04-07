import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";

export function createContext({ req, res }: CreateExpressContextOptions) {
  console.log(req.headers.authorization);
  return { isAdmin: false };
}

export type Context = inferAsyncReturnType<typeof createContext>;
