import "@babel/polyfill";

import mongoose from "mongoose";
import { mongo, elastic } from "./config";
import TranslationDataModel from "../src/model/translation-data.model";
import ImportModel from "../src/model/import.model";

jest.setTimeout(30000);

beforeAll(async done => {
  try {
    await mongoose.connect(mongo.url, {
      useNewUrlParser: true
    });
    await TranslationDataModel.remove({});
    await ImportModel.remove({});
    done();
  } catch (error) {
    done(error);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  //   await mongoServer.stop();
});
