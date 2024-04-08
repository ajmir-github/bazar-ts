import { router, procedure } from "../trpc";
import UserValidator from "validators/UserValidator";
import database from "utils/database";
import { TRPCError } from "@trpc/server";
import { compareSync } from "bcryptjs";
import { signToken } from "utils/jwt";
import { z } from "zod";
import { User } from "@prisma/client";

const authRouter = router({
  self: procedure.query(async function ({
    ctx,
  }): Promise<Omit<User, "password">> {
    if (!ctx.auth) throw new TRPCError({ code: "BAD_REQUEST" });
    const { password, ...user } = ctx.auth;
    return user;
  }),
  signIn: procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .query(async function ({
      input,
    }): Promise<{ token: string; user: Omit<User, "password"> }> {
      // find user
      const user = await database.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found!",
        });
      // match pass
      if (!compareSync(input.password, user.password))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password not matched!",
        });
      // sign token
      const token = signToken({ userId: user.id });
      // done
      const { password, ...rest } = user;
      return {
        token,
        user: rest,
      };
    }),
});

export default authRouter;
