/**
 * @file posts router
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as express from "express";
import { asyncWrap } from "../middleware";
import { PostController } from "./controller";

export const postRouter = express.Router();

postRouter.get("/", asyncWrap(PostController.getPosts));

postRouter.post("/", asyncWrap(PostController.addPost));
