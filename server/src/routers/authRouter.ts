import {
  signInController,
  signUpController,
  updateUserController,
} from "@/controllers/authController";
import Autheticate from "@/middlewares/Authenticate";
import Validate from "@/middlewares/Validate";
import hashPasswordInput from "@/middlewares/hashPasswordInput";
import onlyRootUser from "@/middlewares/onlyRootUser";
import onlyUniqueEmailInput from "@/middlewares/onlyUniqueEmailInput";
import signUpRoot from "@/middlewares/signUpRoot";
import userInputValidator from "@/validators/userInputValidator";
import { Router } from "express";

const authRouter = Router();

// ---------------------------------------- any user
// POST api/auth/sign-in
authRouter.post(
  "/sign-in",
  Validate({ body: userInputValidator.pick({ email: true, password: true }) }),
  signInController
);
// POST api/auth/sign-up  (if not user create root)
authRouter.post(
  "/sign-up",
  Validate({ body: userInputValidator.pick({ email: true, password: true }) }),
  signUpRoot,
  onlyUniqueEmailInput,
  hashPasswordInput,
  signUpController
);

// ---------------------------------------- only the owner users
// PATCH api/auth/self
authRouter.patch(
  "/self/",
  Validate({ body: userInputValidator.pick({ email: true, password: true }) }),
  Autheticate(true),
  hashPasswordInput,
  updateUserController
);

// ---------------------------------------- root user only
// PATCH api/auth/:userId
authRouter.patch(
  "/:userId",
  Validate({
    body: userInputValidator.pick({
      email: true,
      password: true,
      role: true,
      verified: true,
    }),
  }),
  onlyUniqueEmailInput,
  hashPasswordInput,
  Autheticate(true),
  onlyRootUser,
  updateUserController
);

export default authRouter;
