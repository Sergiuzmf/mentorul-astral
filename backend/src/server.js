const config = require("./config");
const { app, schemaReady } = require("./app");

schemaReady
  .then(() => {
    app.listen(config.port, () => {
      console.log(`ONAA backend listening on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize backend schema", error);
    process.exit(1);
  });
