import { Router } from "express";

const authRouter = Router();

// POST api/auth/sign-in
// POST api/auth/sign-up  (if not user create root)
// POST api/auth/change-password
// POST api/auth/change-email
// POST api/auth/change-role (if root user)

export default authRouter;
