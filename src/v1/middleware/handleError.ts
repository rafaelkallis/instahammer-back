/**
 * @file error middleware
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { NextFunction, Request, Response } from "express";
import { config } from "../../config";
import { LogService } from "../../services";
import { IClientError, INTERNAL, IServerError } from "../errors";

/**
 * Error middleware.
 * Wraps a controller handler in a transaction.
 */
export function handleError() {
  return function handleErrorInner(
    err: IClientError | IServerError | object,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if ("isClientError" in err) {
      const { code, message } = err;
      res.status(400).send({
        error: { code, message }
      });
    } else if ("isServerError" in err) {
      const { code, message } = err;
      res.status(500).send({
        error: { code, message }
      });
    } else {
      LogService.error(String(err));
      const { code, message } = INTERNAL();
      res.status(500).send({
        error: { code, message }
      });
    }
  };
}
