import logger from "../infrastructure/logger";
import Import from "../model/import.model";
import TranslationData from "../model/translation-data.model";

export default class TranslationRepository {
  create = async (filename, data) => {
    try {
      const savedTranslations = await this.saveTranslations(data);
      const importData = new Import({
        file: filename,
        data: savedTranslations
      });
      const saved = await importData.save();
      return saved;
    } catch (error) {
      logger.error("Error saving file information to database: ", error);
      throw error;
    }
  };

  saveTranslations = async data => {
    try {
      const translations = [];
      for (const translationData of data) {
        if (translationData.source && translationData.target) {
          let translationDoc = await TranslationData.findOne(translationData);
          if (!translationDoc) {
            translations.push(translationData);
          }
        }
      }
      let savedTranslations = [];
      if (translations && translations.length > 0) {
        savedTranslations = await TranslationData.insertMany(translations);
      }

      return savedTranslations;
    } catch (error) {
      logger.error("Error saving translation data to database: ", error);
    }
  };
}
