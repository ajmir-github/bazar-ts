import { Router } from "express";
import authRouter from "./authRouter";

const routers = Router();

// init request cache
routers.use((request, response, next) => {
  request.cache = {};
  next();
});

// register routers
routers.use("auth", authRouter);

// if wrong URL passed
const urlNotFound: Handler = (request, response) => {
  response.status(500).json({
    error: {
      message: "Wrong url passed!",
    },
  });
};
routers.use("*", urlNotFound);

export default routers;
