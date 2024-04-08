import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { TRPCError, inferAsyncReturnType } from "@trpc/server";
import { verifyToken } from "utils/jwt";
import database from "utils/database";
import { User } from "@prisma/client";

export interface Context {
  auth?: User;
}

export async function createContext({
  req,
  res,
}: CreateExpressContextOptions): Promise<Context> {
  const getAuth = async () => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new Error("The user lacks authorization!");
      const { userId } = verifyToken(token.replace("Bearer ", ""));
      const user = await database.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new Error("This user does not exists anymore!");
      return user;
    } catch (error: any) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message,
      });
    }
  };
  return {};
}
