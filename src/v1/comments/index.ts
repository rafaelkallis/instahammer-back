import * as express from "express";
import * as Joi from "joi";
import { asyncWrap, validate } from "../middleware";
import { CommentController } from "./controller";

export { Comment } from "./model";
export const commentRouter = express.Router();

commentRouter.get(
  "/",
  validate.query({ postId: Joi.string().required() }),
  asyncWrap(CommentController.getComments)
);

commentRouter.post(
  "/",
  validate.body({
    author: Joi.string().required(),
    text: Joi.string().required(),
    postId: Joi.string().required()
  }),
  asyncWrap(CommentController.addComment)
);
