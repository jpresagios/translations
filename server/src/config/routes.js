import { router } from "../infrastructure/express";
import logger from "../infrastructure/logger";

import TranslationController from "./../controller/translation.controller";
import ImportController from "./../controller/import.controller";

export default () => {
  logger.info("Initializing app routes");

  const tc = new TranslationController();
  router.get("/translate", tc.translate);

  const ic = new ImportController();
  router.post("/import", ic.importFile);
};
