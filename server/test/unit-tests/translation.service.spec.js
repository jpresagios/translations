import ElasticSearchServiceMock from "../utils/elasticsearch.service.mock";
import TranslationService from "../../src/service/translation.service";

const translationService = new TranslationService(ElasticSearchServiceMock);
describe('Search traslations must', () => {
  it('calls search method from elesticsearch respository', async () => {
    const result = await translationService.search('query')
    expect(result.totalFound).toBe(2)
    expect(result.totalRetrieved).toBe(2)
    expect(result.traslations.length).toBe(2)
  })
})