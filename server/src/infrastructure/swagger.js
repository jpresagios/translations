const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

export default (app, router) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/api/v1", router);
};
