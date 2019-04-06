/**
 * @file vision service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as request from "superagent";
import { config } from "../config";
const noSpecialCharactersRegex = /^[a-zA-Z0-9 ]+$/;
const noSpecialCharacters = noSpecialCharactersRegex
  .test.bind(noSpecialCharactersRegex);

const pickDescription = x => x.description;
const toLowerCase = s => s.toLowerCase();

export class VisionService {
  /**
   * Extracts tags from a given image url.
   */
  public static async analyze(imageUri: string): Promise<{
    textTags: string[];
    webTags: string[];
    logoTags: string[];
  }> {
    const response = await request
      .post("https://vision.googleapis.com/v1/images:annotate")
      .query({ key: config.googleVisionApiKey })
      .send({
        requests: [
          {
            features: [
              {
                type: "WEB_DETECTION",
                maxResults: 10
              },
              {
                type: "LOGO_DETECTION",
                maxResults: 10
              },
              {
                type: "TEXT_DETECTION",
                maxResults: 10
              }
            ],
            image: { source: { imageUri } }
          }
        ]
      });
    const {
      textAnnotations = [],
      webDetection: { webEntities = [] } = {},
      logoAnnotations = []
    } = response.body.responses[0];
    return {
      textTags: textAnnotations
        .map(pickDescription)
        .filter(Boolean)
        .filter(noSpecialCharacters)
        .map(toLowerCase),
      webTags: webEntities
        .map(pickDescription)
        .filter(Boolean)
        .filter(noSpecialCharacters)
        .map(toLowerCase),
      logoTags: logoAnnotations
        .map(pickDescription)
        .filter(Boolean)
        .filter(noSpecialCharacters)
        .map(toLowerCase)
    };
  }
}

