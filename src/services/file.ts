/**
 * @file file service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as aws from "aws-sdk";
import { config } from "../config";

const s3 = new aws.S3({
  accessKeyId: config.s3AccessKeyId,
  secretAccessKey: config.s3SecretAccessKey
});

export class FileService {

  /**
   * Uploads the given payload and returns a URL.
   */
  public static async upload(
    key: string,
    payload: Buffer,
    ContentType: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.s3Bucket,
        Key: key,
        Body: payload,
        ContentType
      };

      s3.upload(params, (err: Error | null, data: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data.Location);
      });
    });
  }

  public static async delete(key: string): Promise<void> {
    // TODO: implement
  }
}
