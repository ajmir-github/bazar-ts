import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { userRouter } from "./userRouter";

const AppRouter = router({
  user: userRouter,
  log: publicProcedure.input(z.string().min(3)).query(({ input, ctx }) => {
    console.log(ctx);
    console.log({ input });
  }),
});

export default AppRouter;
