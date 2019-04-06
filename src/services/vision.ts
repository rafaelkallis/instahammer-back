/**
 * @file vision service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as request from "superagent"; 
import { config } from "../config";

export class VisionService {
  /**
   * Extracts web entities from a given image url.
   */
  public static async analyze(imageUri: string): Promise<string[]> {
    const response = await request
    .post("https://vision.googleapis.com/v1/images:annotate")
    .query({ key: config.googleVisionApiKey })
    .send({
      requests: [
        {
          features: [{
            type: "WEB_DETECTION",
            maxResults: 10
          }],
          image: { source: { imageUri } }
        }
      ]
    });

    const { webEntities } = response.body.responses[0].webDetection;
    return webEntities.map(webEntity => webEntity.description);
  }
}
