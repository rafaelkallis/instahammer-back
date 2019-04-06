/**
 * @file time service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

export class TimeService {
  /**
   * Seconds since epoch.
   */
  public static unix(): number {
    return Math.floor(Date.now() / 1000);
  }
}
