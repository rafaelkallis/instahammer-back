/**
 * @file config
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as env from "dotenv-safe";

if (process.env.NODE_ENV !== "production") {
  env.config();
}

export const config = {
};
