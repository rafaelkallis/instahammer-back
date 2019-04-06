/**
 * @file error service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { config } from "../config";

export class ErrorService {
  public static throwClientError(code: string, message: string): never {
    throw {
      isClientError: true,
      code,
      message
    };
  }

  public static throwServerError(code: string, message: string): never {
    throw {
      isClientError: false,
      code,
      message
    };
  }
}
