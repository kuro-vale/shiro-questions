import {app as serverEs} from "./server/es/server.mjs";
import {app as serverEn} from "./server/en/server.mjs";

const express = require("express");

function run() {
  const port = process.env["PORT"] || 4000;
  const server = express();

  server.use("/en", serverEn());
  server.use("/es", serverEs());
  server.use("/", (req, res) => {
    res.redirect("/en");
  });
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
