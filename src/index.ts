/**
 * @file index
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { config } from "./config";
import { router } from "./router";
import { LogService } from "./services";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));

app.use(router);

app.listen(config.port, () => {
  LogService.info("Express server listening on port " + config.port);
});
