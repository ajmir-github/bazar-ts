import database from "@/utils/database";
import { signToken } from "@/utils/jwt";
import { compareSync } from "bcryptjs";
// ---------------------------------------- any user

// POST api/auth/sign-in
export const signInController: PostHandler<{
  email: string;
  password: string;
}> = async (request, response) => {
  const { email, password } = request.body;
  // find email
  const user = await database.user.findUnique({ where: { email } });
  if (!user)
    return response.status(400).json({
      errors: [
        {
          path: ["email"],
          code: "custom",
          message: "Email not found!",
        },
      ],
    });
  // match password
  const passwordMatched = compareSync(password, user.password);
  if (!passwordMatched)
    response.status(400).json({
      errors: [
        {
          path: ["password"],
          code: "custom",
          message: "Password not matched!",
        },
      ],
    });
  // sign token
  const token = signToken({ userId: user.id });
  // done
  response.json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
};
// POST api/auth/sign-up  (if not user create root)
export const signUpController: PostHandler<{
  email: string;
  password: string;
}> = async (request, response, next) => {
  // create user
  const { email, password } = request.body;
  const user = await database.user.create({
    data: {
      email,
      password,
    },
  });
  // sign token
  const token = signToken({ userId: user.id });

  // done
  response.json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
};

// ---------------------------------------- only the owner users
// POST api/auth/self
export const updateUserController: PostHandler<{
  email?: string;
  password?: string;
}> = async (request, response) => {
  if (!request.cache.user)
    throw new Error(
      "changeSelfPassword controller requires request.cache.user!"
    );
  const userId = request.params.id || request.cache.auth?.id;
  const { password, email } = request.body;
  database.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
      email,
    },
  });
  response.json({
    data: {
      message: "User updated!",
    },
  });
};

// ---------------------------------------- root user only
// POST api/auth/:userid
