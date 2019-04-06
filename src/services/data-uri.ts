/**
 * @file data uri service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

const base64ImageBodyRegex = /^data:([\w\/]+);([\w-]+),([\w\/+=]+)$/;

export class DataURIService {
  /**
   * Decodes a given data URI and returns the media type, encoding and payload
   */
  public static decode(
    dataURI: string
  ): { mediaType: string; encoding: string; payload: Buffer } | false {
    try {
      dataURI = decodeURIComponent(dataURI);
    } catch (e) {
      return false;
    }
    const matches = base64ImageBodyRegex.exec(dataURI);
    if (!matches) {
      return false;
    }
    const [, mediaType, encoding, rawPayload] = matches;
    const payload = Buffer.from(rawPayload, encoding);
    return { mediaType, encoding, payload };
  }
}
