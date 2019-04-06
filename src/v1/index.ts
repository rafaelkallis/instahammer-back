/**
 * @file v1 router
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as express from "express";
import { commentRouter } from "./comments";
import { handleError, transact } from "./middleware";
import { postRouter } from "./posts";

export const v1Router = express.Router();

v1Router.use(transact());

v1Router.use("/posts", postRouter);
v1Router.use("/comments", commentRouter);

v1Router.use(handleError());
