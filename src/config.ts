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
  algoliaApiKey: process.env.ALGOLIASEARCH_API_KEY,
  algoliaApiKeySearch: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
  algoliaApplicationId: process.env.ALGOLIASEARCH_APPLICATION_ID
};

if (process.env.NODE_ENV === "production") {
  config.databaseUrl += "?ssl=true";
}
