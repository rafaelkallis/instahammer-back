/**
 * @file error middleware
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { NextFunction, Request, Response } from "express";
import { config } from "../../config";

/**
 * Error middleware.
 * Wraps a controller handler in a transaction.
 */
export function handleError() {
  return function handleErrorInner(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err.isClientError) {
      res.status(400).send({
        error: {
          code: err.code,
          message: err.message
        }
      });
      return;
    }
    res.status(500).send({
      error: {
        code: err.code || "INTERNAL_ERROR",
        message:
          err.message || "Request cannot be processed due to internal error."
      }
    });
  };
}
