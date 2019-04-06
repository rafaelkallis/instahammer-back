/**
 * @file post model
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Model, snakeCaseMappers } from "objection";

export class Post extends Model {
  public static tableName = "posts";

  public id: string;
  public title: string;
  public description: string;
  public createdAt: number;
  public location: {
    latitude: number;
    longitude: number;
  };
  public postTags: string[];
  public image: string;
  public imageTags: Array<{
    text: string;
    pos: {
      x: number;
      y: number;
    };
  }>;
}