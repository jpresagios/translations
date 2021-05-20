import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => `[${info.level}] ${info.timestamp}: ${info.message}`)
  ),
  // defaultMeta: { service: "TSM-API" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.printf(
        info => `[${info.level}] ${info.timestamp}: ${info.message}`
      )
    })
  );
}

export default logger;
