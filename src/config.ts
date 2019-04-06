/**
 * @file config
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as env from "dotenv-safe";

if (process.env.NODE_ENV !== "production") {
  env.config();
}

export const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  algolia: {
    apiKey: process.env.ALGOLIASEARCH_API_KEY,
    apiKeySearch: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
    applicationId: process.env.ALGOLIASEARCH_APPLICATION_ID
  }
};

if (process.env.NODE_ENV === "production") {
  config.databaseUrl += "?ssl=true";
}
