/**
 * @file log service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import { createLogger, format, transports } from "winston";

export class LogService {
  public static debug(arg: string, ...rest: string[]) {
    LogService.logger.debug(arg, ...rest);
  }

  public static info(arg: string, ...rest: string[]) {
    LogService.logger.info(arg, ...rest);
  }

  public static warn(arg: string, ...rest: string[]) {
    LogService.logger.warn(arg, ...rest);
  }

  public static error(arg: string, ...rest: string[]) {
    LogService.logger.error(arg, ...rest);
  }

  private static logger = createLogger({
    level: "info",
    transports: [
      new transports.Console({
        format: format.combine(format.colorize({ all: true }), format.simple())
      })
    ]
  });
}
