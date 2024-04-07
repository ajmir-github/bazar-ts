import { router, privateProcedure } from "../trpc";

export const userRouter = router({
  getUsers: privateProcedure.query(({ ctx }) => {
    return [1, 2, 3];
  }),
});
