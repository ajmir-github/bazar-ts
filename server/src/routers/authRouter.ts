import { Router } from "express";

const authRouter = Router();

const getList: GetHandler<{ userId: string }> = (request, response) => {
  request.cache.auth;
  request.params.userId;

  response.send({ errors: [], data: {} });
};

authRouter.get("asd", getList);

export default authRouter;
