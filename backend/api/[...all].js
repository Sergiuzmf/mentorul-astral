const { app, schemaReady } = require("../src/app");

module.exports = async (request, response) => {
  await schemaReady;
  return app(request, response);
};
