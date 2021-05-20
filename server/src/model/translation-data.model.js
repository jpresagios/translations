import { Schema, model } from "mongoose";
import ElasticSearchService from "./../infrastructure/elasticsearch";

const es = new ElasticSearchService();

const translationDataSchema = new Schema({
  import: { type: Schema.Types.ObjectId, ref: "Import" },
  source: { type: String, required: true },
  target: { type: String, required: true }
});

translationDataSchema.post("insertMany", async function (translations) {
  if (translations.length) {
    try {
      await es.indexMany(
        translations.map(d => ({ source: d.source, target: d.target }))
      );
    } catch (error) {
      logger.error("Error indexing translation: ", error);
    }
  }
});

export default model("TranslationData", translationDataSchema);
