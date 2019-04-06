/**
 * @file random service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as uuidv4 from "uuid/v4";

export class RandomService {
  /**
   * Generates a uuid v4
   */
  public static uuid(): string {
    return uuidv4();
  }
}
