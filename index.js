const loging = require("./tracing")("api-service");
const winston = require("winston");
const expressWinston = require("express-winston");
const LogzioWinstonTransport = require("winston-logzio");
const winstonInstance = winston.createLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    (logzioWinstonTransport = new LogzioWinstonTransport({
      level: "info",
      name: "winston_logzio",
      token: "VohVSprHkLFjAMJpddtJJNflMgqISgED",
      host: "listener.logz.io",
    })),
  ],
});

//const logging = winston.createLogger({
//  transports: [new winston.transports.Console()],
//});

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  })
);

app.all("/", (req, res) => {
  res.json({ method: req.method, message: "Hello World", ...req.body });
});

app.get("/404", (req, res) => {
  res.sendStatus(404);
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Server Listening on port http://localhost:${PORT}`);
});
