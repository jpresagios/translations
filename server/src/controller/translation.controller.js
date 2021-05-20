import logger from "../infrastructure/logger";
import translationService from "./../service/translation.service";

export default class TranslationController {
  constructor(TranslationService = translationService) {
    this.service = new TranslationService();
  }

  translate = async (req, res) => {
    try {
      logger.info("Executing translation for: ", req.query.criteria);
      const result = await this.service.search(req.query.criteria);
      return res.status(200).json({
        status: 200,
        data: result,
        message: "Succesfully items recieved"
      });
    } catch (error) {
      logger.info("Executing translation", req.body);
      return res.status(500).json({
        status: 500,
        message: "Error executing translation"
      });
    }
  };
}
