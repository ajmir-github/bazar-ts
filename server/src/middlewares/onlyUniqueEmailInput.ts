import database from "@/utils/database";

const onlyUniqueEmailInput: Handler = async (request, response, next) => {
  const email: string | undefined = request.body.email;
  // if not email entry
  if (!email) return next();
  const user = await database.user.findUnique({ where: { email } });
  // if not exist
  if (!user) return next;
  // else
  response.status(400).json({
    errors: [
      {
        fatal: true,
        message: "This email is already in use!",
        path: ["email"],
        code: "custom",
      },
    ],
  });
};

export default onlyUniqueEmailInput;
