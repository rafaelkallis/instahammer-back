/**
 * @file transactional middleware
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { NextFunction, Request, Response } from "express";
import { transaction } from "objection";
import * as onFinished from "on-finished";
import { Post } from "../posts";

/**
 * Transactional middleware.
 * Wraps a controller handler in a transaction.
 */
export function transact() {
  return async function transactInner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    transaction(
      Post,
      post =>
        new Promise((resolve, reject) => {
          res.locals.tx = { post };
          onFinished(res, err => {
            if (!err) {
              resolve();
            } else {
              reject(err);
            }
          });
          next();
        })
    );
  };
}
