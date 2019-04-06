/**
 * @file comment model
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Model, snakeCaseMappers } from "objection";

export class Comment extends Model {
  public static tableName = "comments";
  public static columnNameMappers = snakeCaseMappers();

  public id: string;
  public title: string;
  public author: string;
  public createdAt: number;
  public postId: string;
}
