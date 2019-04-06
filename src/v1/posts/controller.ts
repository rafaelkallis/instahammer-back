/**
 * @file posts controller
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Request, Response } from "express";
import * as errors from "../errors";

export class PostController {
  /**
   * Handler for adding a post.
   */
  public static async addPost(req: Request, res: Response) {
    // TODO: implement
    throw errors.UNIMPLEMENTED();
  }

  /**
   * Handler for querying posts.
   */
  public static async getPosts(req: Request, res: Response) {
    // TODO: implement
    throw errors.UNIMPLEMENTED();
  }
}
