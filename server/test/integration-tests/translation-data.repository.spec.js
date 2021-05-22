import "@babel/polyfill";

import TranslationDataRepository from "../../src/repository/translation-data.repository";
import TranslationData from "../../src/model/translation-data.model";
import Import from "../../src/model/import.model";

const repository = new TranslationDataRepository();

describe("Translation Data Repository Integration Test", () => {
  describe("Translation data respository must", () => {
    it("save file info and translation data in mongodb", async () => {
      await repository.create("translations.json", [
        {
          source: "Hola Mundo",
          target: "Hello World"
        }
      ]);
      const importFile = await Import.findOne({
        file: "translations.json"
      });
      expect("translations.json").toBe(importFile.file);

      const translations = await Import.find({})
      expect(translations.length).toBe(1);
    });

    it("not to repeat equal data in translations mongodb", async () => {
      await repository.create("translations.json", [
        { source: "Hola", target: "Hello" },
        { source: "Hola Mundo", target: "Hello World" }
      ]);
      const translations = await TranslationData.find({});
      expect(translations.length).toBe(2);
    });
  });
});
