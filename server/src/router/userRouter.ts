import { router, procedure } from "../trpc";

const userRouter = router({
  getUsers: procedure.query(({ ctx }) => {
    return [1, 2, 3];
  }),
});

export default userRouter;
