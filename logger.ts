import winston from "winston";

const { combine, timestamp, align, printf } = winston.format;

const logger = winston.createLogger({
  level: "info",

  // Easy to read logging format
  format: combine(
    timestamp({
      format: "DD-MM-YYYY hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),

  // handles normal logging to file
  transports: [
    new winston.transports.File({ filename: "standard.log", dirname: "logs" }),
  ],

  // Handles uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      dirname: "logs",
    }),
  ],

  // Handles unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.File({
      filename: "rejections.log",
      dirname: "logs",
    }),
  ],
});

export default logger;
