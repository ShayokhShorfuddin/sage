import winston from "winston";

const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new winston.transports.File({ filename: "standard.log", dirname: "logs" }),
  ],

  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      dirname: "logs",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "rejections.log",
      dirname: "logs",
    }),
  ],
});

export default logger;
