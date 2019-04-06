/**
 * @file posts controller
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Request, Response } from "express";
import * as errors from "../errors";

function DummyPost() {
  return {
    id: "some-id",
    title: "Pump Failure",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et hendrerit mauris. Integer consectetur tempor augue quis pulvinar. Nullam non vestibulum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce lacinia sem felis, non pretium sem cursus sed. Nunc et faucibus odio. Donec vulputate pellentesque nulla vel consectetur. Sed blandit hendrerit quam nec suscipit.",
    createdAt: 1554550564,
    location: {
      latitude: 47.5056,
      longitude: 8.7241
    },
    postTags: ["pump", "A3000", "corosion"],
    image:
      "https://www.bouldencompany.com/images/site/Vespel%20Images/Vespel%20Case%20Studies%20LPG%20Pump%201.jpg",
    imageTags: [
      {
        text: "corosion",
        pos: {
          x: 50,
          y: 30
        }
      },
      {
        text: "cracks",
        pos: {
          x: 40,
          y: 70
        }
      }
    ]
  };
}

export class PostController {
  /**
   * Handler for adding a post.
   */
  public static async addPost(req: Request, res: Response) {
    // TODO: implement
    res.send(DummyPost());
  }

  /**
   * Handler for querying posts.
   */
  public static async getPosts(req: Request, res: Response) {
    // TODO: implement
    res.send([DummyPost(), DummyPost(), DummyPost()]);
  }
}
