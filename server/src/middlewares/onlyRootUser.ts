import { Role } from "@prisma/client";

const onlyRootUser: Handler = (request, response, next) => {
  // if not auth
  if (!request.cache.auth)
    throw new Error("onlyRootUser middleware required authetication details!");
  // if not admin
  if (request.cache.auth.role !== Role.Root)
    return response.status(403).json({
      error: {
        message: "Your are not allowed to bring these changes!",
      },
    });
  // else
  next();
};
export default onlyRootUser;
