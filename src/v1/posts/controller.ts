/**
 * @file posts controller
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

export class PostController {
  /**
   * Handler for adding a post.
   */
  public static async addPost(req: Request, res: Response) {
    let post = {
      id: RandomService.uuid(),
      createdAt: TimeService.unix(),
      isResolved: false,
      ...req.body
    };
    if (post.image) {
      const decoded = DataURIService.decode(post.image);
      if (!decoded) {
        throw errors.INVALID_IMAGE_ERROR();
      }
      const { mediaType, payload } = decoded;
      post.image = await FileService.upload(
        RandomService.uuid(),
        payload,
        mediaType
      );
    }
    try {
      post = await res.locals.tx.post
        .query()
        .insert(post)
        .returning("*");
    } catch (e) {
      throw errors.INTERNAL_DATABASE_ERROR();
    }
    post.comments = [];
    await SearchService.add(post.id, PostController.getIndexFields(post));
    res.send(post);
  }

  /**
   * Handler for querying posts.
   */
  public static async getPosts(req: Request, res: Response) {
    let posts;
    try {
      posts = await res.locals.tx.post.query();

      for (const post of posts) {
        post.comments = await res.locals.tx.comment
          .query()
          .where("post_id", post.id);
      }
    } catch (e) {
      throw errors.INTERNAL_DATABASE_ERROR();
    }
    res.send(posts);
  }

  /**
   * Handler for fetching single post.
   */
  public static async getPost(req: Request, res: Response) {
    const { id } = req.params;
    let post;
    try {
      const [result] = await res.locals.tx.post.query().where("id", id);
      post = result;

      post.comments = await res.locals.tx.comment.query().where("post_id", id);
    } catch (e) {
      throw errors.POST_NOT_FOUND_ERROR();
    }
    if (!post) {
      throw errors.POST_NOT_FOUND_ERROR();
    }

    /* fetch similar posts */
    post.similarPosts = [];
    const similarPostIds = await SearchService.query(
      PostController.getIndexFieldsString(post)
    );
    for (const similarPostId of similarPostIds) {
      const [similarPost] = await res.locals.tx.post
        .query()
        .where({ id: similarPostId });

      if (similarPost) {
        post.similarPosts.push(similarPost);
      }
    }
    res.send(post);
  }

  private static getIndexFields(post) {
    const { title, description, postTags, imageTags, ...rest } = post;
    return { title, description, postTags, imageTags };
  }

  private static getIndexFieldsString(post): string {
    return (
      "" +
      `${post.title} ` +
      `${post.description} ` +
      post.postTags.reduce((cur, next) => `${cur} ${next}`, "") +
      post.imageTags.reduce((cur, next) => `${cur} ${next.text}`, "")
    );
  }
}
