/**
 * @file v1 router
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as express from "express";
import { handleError } from "./middleware";

export const v1Router = express.Router();

v1Router.use(handleError());
