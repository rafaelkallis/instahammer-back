/**
 * @file search service
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as algoliasearch from "algoliasearch";
import { config } from "../config";

export class SearchService {
  /**
   * Search for similar posts given a string query.
   */
  public static async query(query: string): Promise<string[]> {
    const results = await SearchService.index.search({
      query,
      attributesToRetrieve: ["objectID"],
      hitsPerPage: 5
    });
    return results.hits.map(hit => hit.objectID);
  }

  /**
   * Add a post to the search index.
   */
  public static async add(id: string, payload: any): Promise<void> {
    await SearchService.index.addObject({ ...payload, objectID: id });
  }

  /**
   * Update a post in the search index.
   */
  public static async update(id: string, payload: any): Promise<void> {
    await SearchService.index.saveObject({ ...payload, objectID: id });
  }

  /**
   * Delete a post in the search index.
   */
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
