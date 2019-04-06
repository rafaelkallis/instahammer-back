/**
 * @file vision router
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as express from "express";
import * as Joi from "joi";
import { asyncWrap, validate } from "../middleware";
import { VisionController } from "./controller";

export const visionRouter = express.Router();

visionRouter.post(
  "/",
  validate.body({
    image: Joi.string().required(),
  }),
  asyncWrap(VisionController.analyzeImage)
);
