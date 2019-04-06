/**
 * @file comments controller
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Request, Response } from "express";
import {
  DataURIService,
  FileService,
  RandomService,
  SearchService,
  TimeService
} from "../../services";
import * as errors from "../errors";

export class CommentController {
  /**
   * Handler for adding a comment.
   */
  public static async addComment(req: Request, res: Response) {
    let comment = {
      id: RandomService.uuid(),
      createdAt: TimeService.unix(),
      ...req.body
    };
    try {
      comment = await res.locals.tx.comment
        .query()
        .insert(comment)
        .returning("*");
    } catch (e) {
      throw errors.POST_NOT_FOUND_ERROR();
    }
    res.send(comment);
  }

  /**
   * Handler for querying comments.
   */
  public static async getComments(req: Request, res: Response) {
    const { postId } = req.params;
    let comments;
    try {
      comments = await res.locals.tx.comment.query().where("post_id", postId);
    } catch (e) {
      throw errors.POST_NOT_FOUND_ERROR();
    }
    res.send(comments);
  }
}
