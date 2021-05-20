import logger from "../infrastructure/logger";
import translationRepository from "../repository/translation-data.repository";

export default class ImportService {
  constructor(TranslationRepository = translationRepository) {
    this.repository = new TranslationRepository();
  }

  importFile = async fileInfo => {
    try {
      const fileData =
        fileInfo.data.indexOf("base64,") === -1
          ? fileInfo.data
          : fileInfo.data.substr(fileInfo.data.indexOf("base64,") + 7);
      const buff = Buffer.from(fileData, "base64");
      const text = buff.toString("utf8");
      const data = JSON.parse(text);
      return await this.repository.create(fileInfo.name, data);
    } catch (error) {
      logger.error("Error creating translation data: ", error);
      throw error;
    }
  };

  getImportHistory = async () => {
    try {
      const list = await this.repository.list();
      return list;
    } catch (error) {
      logger.error("Error creating translation list ", error);
    }
  };
}
