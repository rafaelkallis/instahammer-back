/**
 * @file wrapper for async middleware
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { NextFunction, Request, Response } from "express";

/**
 * Wraps an async handler and makes it compatible with express.
 */
export function asyncWrap(
  middleware: (req: Request, res: Response) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    middleware(req, res).catch(next);
  };
}
