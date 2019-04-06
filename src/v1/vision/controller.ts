/**
 * @file vision controller
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { Request, Response } from "express";
import {
  DataURIService,
  FileService,
  RandomService,
  VisionService
} from "../../services";
import * as errors from "../errors";

export class VisionController {
  /**
   * Handler for analyzing images.
   */
  public static async analyzeImage(req: Request, res: Response) {
    const decoded = DataURIService.decode(req.body.image);
    if (!decoded) {
      throw errors.INVALID_IMAGE_ERROR();
    }
    const { mediaType, payload } = decoded;
    const key = RandomService.uuid();
    const imageUrl = await FileService.upload(
      key,
      payload,
      mediaType
    );
    const visionTags = await VisionService.analyze(imageUrl);
    await FileService.delete(key);
    res.send(visionTags);
  }
}
