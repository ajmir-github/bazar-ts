import database from "@/utils/database";
import { Role } from "@prisma/client";

let rootCreated = false;

const signUpRoot: Handler = async (request, response, next) => {
  // if create pass
  if (rootCreated) return next();
  const rootUser = await database.user.count({
    where: {
      role: Role.Root,
    },
  });
  // make that there is not root user
  if (rootUser > 0) {
    rootCreated = true;
    return next();
  }
  // create
  request.body.role = Role.Root;
  next();
};

export default signUpRoot;
