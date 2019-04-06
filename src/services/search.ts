/**
 * @file search service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as algoliasearch from "algoliasearch";
import { config } from "../config";

export class SearchService {

  public static async add(id: string, payload: any): Promise<void> {
    // TODO: implement
  }
  
  public static async update(id: string, payload: any): Promise<void> {
    // TODO: implement
  }
  
  public static async query(payload: any): Promise<string[]> {
    // TODO: implement
    return [];
  }

  private static client = algoliasearch(
    config.algoliaApplicationId,
    config.algoliaApiKey
  );
}
