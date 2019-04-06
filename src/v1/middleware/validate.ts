/**
 * @file validation middleware
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

export const validate = {
  /**
   * Body validation middleware.
   */
  body: validateReqProp("body"),

  /**
   * Query validation middleware.
   */
  query: validateReqProp("query"),

  /**
   * Params validation middleware.
   */
  params: validateReqProp("params")
};

function validateReqProp(reqProp: "body" | "query" | "params") {
  return (schema: Joi.SchemaLike, code: string = `req_${reqProp}_err`) => {
    schema = Joi.compile(schema);
    return async function validateParamsInner(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        // assign to request's body because Joi.validate might transform values
        req[reqProp] = await Joi.validate(req[reqProp], schema);
        next();
      } catch (error) {
        res.status(400).send({
          error: {
            code,
            message: error.details[0].message
          }
        });
      }
    };
  };
}
