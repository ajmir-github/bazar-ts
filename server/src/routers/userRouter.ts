import { Router } from "express";

const userRouter = Router();

// GET api/user/ - list users profiles
userRouter.get("/", findProfile);
// GET api/user/:userId
userRouter.get("/:profileId", findOneProfile);
// POST api/user/ -init user profile
userRouter.post("/", createProfile);
// PATCH api/user/:userId  (if root)
userRouter.patch("/", patchProfile);
// DELETE api/user/:userId (if root) - delete user and profile
userRouter.delete("/", deleteProfile);

export default userRouter;
