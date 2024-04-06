import { Router } from "express";

const userRouter = Router();

// GET api/user/ - list users profiles
// GET api/user/:userId
// POST api/user/ -init user profile
// PATCH api/user/:userId  (if root)
// DELETE api/user/:userId (if root) - delete user and profile

export default userRouter;
