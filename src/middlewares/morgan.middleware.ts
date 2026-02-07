import morgan, { StreamOptions } from "morgan";
import Logger from "../lib/logger";

// Override stream: Kirim pesan morgan ke Winston (level http)
const stream: StreamOptions = {
  write: (message) => Logger.http(message.trim()),
};

// Skip log kalau environment bukan development (Opsional)
// const skip = () => {
//   const env = process.env.NODE_ENV || "development";
//   return env !== "development";
// };

// Format pesan morgan
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }, // Hubungkan ke Winston
);

export default morganMiddleware;
