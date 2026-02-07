import winston from "winston";
import path from "path";

// Tentukan level warna log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Format log supaya enak dibaca
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Bikin Logger Utama
const Logger = winston.createLogger({
  level: "debug",
  levels,
  format,
  transports: [
    // 1. Tampilkan di Console (Terminal)
    new winston.transports.Console(),

    // 2. Simpan Error di file khusus (error.log)
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.uncolorize(), // Di file gak usah pakai warna
    }),

    // 3. Simpan SEMUA aktivitas di file (all.log)
    new winston.transports.File({
      filename: "logs/all.log",
      format: winston.format.uncolorize(),
    }),
  ],
});

export default Logger;
