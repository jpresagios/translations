"use strict";

import { Client } from "@elastic/elasticsearch";
import logger from "./logger";
import env from "../config/env.config";

const options = { node: env.ELASTICSEARCH_URL };
if (env.ELASTICSEARCH_USER) {
  options.auth = { username: env.ELASTICSEARCH_USER, password: env.ELASTICSEARCH_PASSWORD };
}
const client = new Client(options);

export default class ElasticSearchService {
  static init = async () => {
    const exists = await this.indexExists();
    if (!exists) {
      throw new Error("No conection to elasticsearh")
    }
    if (exists && !exists.body) {
      logger.info(`ElasaticSearch index exists: ${exists.body}`);
      await this.createIndex();
    }
  };

  static indexExists = async () => {
    try {
      return await client.indices.exists({
        index: env.ELASTICSEARCH_INDEX
      });
    } catch (error) {
      logger.error("Error checking if index exists", error);
    }
  };

  static createIndex = async () => {
    try {
      logger.info("Creating ElasaticSearch index: ");
      await client.indices.create({
        index: env.ELASTICSEARCH_INDEX,
        body: {
          mappings: {
            properties: {
              source: { type: "text" },
              target: { type: "text" }
            }
          }
        }
      });
    } catch (error) {
      logger.error("Error creating index: ", error);
    }
  };

  indexDocument = async doc => {
    try {
      logger.info("Indexing new document");
      await client.index({
        index: env.ELASTICSEARCH_INDEX,
        refresh: true,
        body: doc
      });
    } catch (error) {
      logger.error("Error indexing document: ", error);
    }
  };

  indexMany = async docs => {
    try {
      logger.info("Indexing many documents");
      const bulk = [];

      for (const doc of docs) {
        bulk.push({ index: {} });
        bulk.push({ target: doc.target, source: doc.source });
      }

      await this.bulk(bulk);
    } catch (error) {
      logger.error("Error indexing document: ", error);
    }
  };

  bulk = async bulkData => {
    try {
      logger.info("Bulk operation");
      await client.bulk({
        index: env.ELASTICSEARCH_INDEX,
        refresh: true,
        body: bulkData
      });
    } catch (error) {
      logger.error("Error indexing document: ", error);
    }
  };

  search = async query => {
    try {
      logger.info("Searching document");
      const { body } = await client.search({
        index: env.ELASTICSEARCH_INDEX,
        ...query
      });
      return body;
    } catch (error) {
      logger.error("Error searching in ElasticSearch: ", error);
    }
  };
}
