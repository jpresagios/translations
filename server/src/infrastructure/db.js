import mongoose from "mongoose";

import logger from "./logger";

import env from "../config/env.config";

const initDb = async () => {
  try {
    const connection = await mongoose.connect(env.DATABASE_URL, {
      useNewUrlParser: true
    });
    logger.info("Database connection successful");
    return connection;
  } catch (error) {
    logger.error("Database connection error");
  }
};

export default initDb;