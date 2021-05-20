"use strict";

import http from "http";
import https from "https";
import fs from "fs";

import env from "./env.config";
import { app as express } from "../infrastructure/express";
import logger from "../infrastructure/logger";
import initDb from "../infrastructure/db";
import ElasticSearchService from "./../infrastructure/elasticsearch";
import swagger from "./../infrastructure/swagger";

import router from "./routes";

// Constants
const sslOptions = {
  key: fs.readFileSync(__dirname + "/../../cert/key.pem"),
  cert: fs.readFileSync(__dirname + "/../../cert/certificate.pem")
};

const server = http.createServer(express);
const httpsServer = https.createServer(sslOptions, express);

const PORT = env.PORT;
const HTTPS_PORT = env.HTTPS_PORT;
const HOST = env.HOST;

swagger(express, router);

export default async () => {
  try {
    await initDb();
    await ElasticSearchService.init();
    router();
    httpsServer.listen(HTTPS_PORT, () => {
      logger.info(`Running on https://${HOST}:${HTTPS_PORT}`);
    });
    server.listen(PORT, () => {
      logger.info(`Running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    logger.error("Error initializing ", error);
  }
};
