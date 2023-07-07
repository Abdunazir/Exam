// const config = require("config");
// const { createLogger, format, transports } = require("winston");
// const { combine, timestamp, printf,  colorize } = format;
// require("winston-mongodb");

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp}  ${level}: ${message}`;
// });
// let logger;
// const devlog = createLogger({
//   format: combine(colorize(), timestamp(), myFormat),
//   transports: [
//     new transports.Console({ level: "debug" }),
//     new transports.File({ filename: "log/error.log", level: "error" }),
//     new transports.File({ filename: "log/combine.log", level: "info" }),
//   ],
// });
// const prodlog = createLogger({
//   format: combine(colorize(), timestamp(), myFormat),
//   transports: [
//     new transports.File({ filename: "log/error.log", level: "error" }),
//     new transports.MongoDB({
//       db: config.get("dbUri"),
//       options: { useUnifiedTopology: true },
//     }),
//   ],
// });

// if (process.env.NODE_ENV == "production") {
//   logger = prodlog;
// } else {
//   logger = devlog;
// }

// logger.exceptions.handle(
//   new transports.File({ filename: "log/exceptions.log" })
// );
// logger.rejections.handle(
//   new transports.File({ filename: "log/rejections.log" })
// );
// logger.exitOnError = false;

// module.exports = logger;
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres_user",
  host: "localhost",
  database: "database_name",
  password: "password",
  port: 5432,
});

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp}  ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/combine.log", level: "info" }),
    new transports.PostgreSQL({
      level: "info",
      table: "logs",
      connection: async () => {
        const client = await pool.connect();
        return client;
      },
      insert: (client, log, callback) => {
        const { level, message, timestamp } = log;
        const query = {
          text: "INSERT INTO logs(level, message, timestamp) VALUES($1, $2, $3)",
          values: [level, message, timestamp],
        };
        client.query(query, (error) => {
          if (error) {
            console.error("Error inserting log:", error);
          }
          client.release();
          callback();
        });
      },
    }),
  ],
});

logger.exceptions.handle(
  new transports.File({ filename: "log/exceptions.log" })
);

logger.rejections.handle(
  new transports.File({ filename: "log/rejections.log" })
);

logger.exitOnError = false;

module.exports = logger;
