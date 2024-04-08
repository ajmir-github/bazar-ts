import { router } from "../trpc";
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const AppRouter = router({
  auth: authRouter,
  user: userRouter,
});

export default AppRouter;
