import { Item, User, Profile, Comment, State, Category } from "@prisma/client";
import { RequestHandler } from "express";
import * as core from "express-serve-static-core";
import { ZodIssue } from "zod";

// to make the file a module and avoid the TypeScript error
export {};

type SuccessResponse = {
  data: any;
};
type ErrorResponse = {
  error: {
    message: string;
  };
};
type ErrorsResponse = {
  errors: ZodIssue[];
};
type ResponseData = SuccessResponse | ErrorResponse | ErrorsResponse;

declare global {
  namespace Express {
    export interface Request {
      cache: {
        item?: Item;
        auth?: User;
        user?: User;
        profile?: Profile;
        comment?: Comment;
        state?: State;
        category?: Category;
      };
    }
  }

  // extra types
  type Handler<
    Params = core.ParamsDictionary,
    Query = core.Query,
    Body = any
  > = RequestHandler<Params, ResponseData, Body, Query>;
  type GetHandler<
    Params = core.ParamsDictionary,
    Query = core.Query
  > = RequestHandler<Params, ResponseData, any, Query>;
  type PostHandler<Body = any> = RequestHandler<
    core.ParamsDictionary,
    ResponseData,
    Body,
    core.Query
  >;
  type PatchHandler<
    Params = core.ParamsDictionary,
    Body = any
  > = RequestHandler<Params, ResponseData, Body, core.Query>;
  type DeleteHandler<Params = core.ParamsDictionary> = RequestHandler<
    Params,
    ResponseData,
    any,
    core.Query
  >;
}
