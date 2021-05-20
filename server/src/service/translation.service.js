import logger from "../infrastructure/logger";
import elasticSearchService from "../infrastructure/elasticsearch";

export default class TranslationService {
  constructor(ElasticSearchService = elasticSearchService) {
    this.elastic = new ElasticSearchService();
  }

  search = async criteria => {
    try {
      const query = {
        body: {
          size: 3,
          query: {
            bool: {
              should: [
                { match: { target: criteria } },
                { match: { source: criteria } }
              ]
            }
          }
        }
      };
      const results = await this.elastic.search(query);
      return results.hits.hits.map(r => ({
        source: r._source.source,
        target: r._source.target
      }));
    } catch (error) {
      logger.error("Error searching information: ", error);
    }
  };
}
