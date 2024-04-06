import database from "@/utils/database";
import { verifyToken } from "@/utils/jwt";

export default function Autheticate(required: boolean): Handler {
  return async (request, response, next) => {
    const failed = (message?: string) => {
      if (!required) return next();
      response.status(401).json({
        error: {
          message: message || "Authetication required!",
        },
      });
    };
    const token = request.headers.authorization;
    if (!token) return failed();
    // varifiy token
    const { userId } = verifyToken(token);
    const user = await database.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return failed("This user does not exists any more!");
    // on success
    request.cache.auth = user;
    next();
  };
}
