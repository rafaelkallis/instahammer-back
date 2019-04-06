/**
 * @file router
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as express from "express";
import { LogService } from "./services";
import { v1Router } from "./v1";

export const router = express.Router();

router.use("/v1", v1Router);

router.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // TODO: proper fallback error handler
    LogService.error(err);
    res.status(500);
  }
);
