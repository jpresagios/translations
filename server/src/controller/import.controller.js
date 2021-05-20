import logger from "../infrastructure/logger";
import importService from "../service/import.service";

export default class ImportController {
  constructor(ImportService = importService) {
    this.service = new ImportService();
  }

  importFile = async (req, res) => {
    try {
      const fileInfo = { name: req.body.name, data: req.body.data };
      logger.info("Executing file import", fileInfo.name);
      const result = await this.service.importFile(fileInfo);
      return res.status(201).json({
        status: 201,
        data: result,
        message: "Succesfully file importation"
      });
    } catch (error) {
      logger.info("Error executing import ", error);
      res.status(500).json({
        status: 500,
        message: "Error file importation"
      });
    }
  };

  getImportHistory = async (req, res) => {
    try {
      logger.info("Getting import history", req.body);
      return res.status(200).json({
        status: 200,
        data: req.body,
        message: "Information gotten succesfully"
      });
    } catch (error) {
      logger.info("Error getting import", error);
      res.send(500).json({
        status: 500,
        message: "Error getting import history information"
      });
    }
  };
}
