/**
 * @file search service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as algoliasearch from "algoliasearch";
import { config } from "../config";

export class SearchService {
  public static async query(query: string): Promise<string[]> {
    const results = await SearchService.index.search({ query });
    return results.hits.map(hit => hit.objectID);
  }

  public static async add(id: string, payload: any): Promise<void> {
    await SearchService.index.addObject({ ...payload, objectID: id });
  }

  public static async update(id: string, payload: any): Promise<void> {
    await SearchService.index.saveObject({ ...payload, objectID: id });
  }

  public static async delete(id: string): Promise<void> {
    await SearchService.index.deleteObject(id);
  }

  private static client = algoliasearch(
    config.algoliaApplicationId,
    config.algoliaApiKey
  );
  private static index = SearchService.client.initIndex(
    config.algoliaIndexName
  );
}
