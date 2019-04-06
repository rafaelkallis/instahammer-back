/**
 * @file posts router
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as express from "express";
import * as Joi from "joi";
import { asyncWrap, validate } from "../middleware";
import { PostController } from "./controller";

export { Post } from "./model";
export const postRouter = express.Router();

postRouter.get("/", asyncWrap(PostController.getPosts));

postRouter.get(
  "/:id",
  validate.params({ id: Joi.string() }),
  asyncWrap(PostController.getPost)
);

postRouter.post(
  "/",
  validate.body({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    }).required(),
    postTags: Joi.array()
      .items(Joi.string())
      .required(),
    image: Joi.string().required(),
    imageTags: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().required(),
          pos: Joi.object({
            x: Joi.number().required(),
            y: Joi.number().required()
          }).required()
        })
      )
      .required()
  }),
  asyncWrap(PostController.addPost)
);
