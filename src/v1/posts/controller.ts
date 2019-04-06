/**
 * @file posts controller
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Request, Response } from "express";
import { RandomService } from "../../services";
import * as errors from "../errors";

export class PostController {
  /**
   * Handler for adding a post.
   */
  public static async addPost(req: Request, res: Response) {
    let post = {
      id: RandomService.uuid(),
      ...req.body
    };
    try {
      post = await res.locals.tx.post
        .query()
        .insert(post)
        .returning("*");
    } catch (e) {
      throw errors.INTERNAL_DATABASE_ERROR();
    }
    // TODO: image/entity recognition
    res.send(post);
  }

  /**
   * Handler for querying posts.
   */
  public static async getPosts(req: Request, res: Response) {
    let posts;
    try {
      posts = await res.locals.tx.post.query();
    } catch (e) {
      throw errors.INTERNAL_DATABASE_ERROR();
    }
    res.send(posts);
  }
}
