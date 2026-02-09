import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import Logger from "../lib/logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API Docs",
      version,
      description: "Dokumentasi API Expense Tracker",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // 👇 PERUBAHAN DI SINI:
  // Kita tulis manual string-nya. Tanpa library 'path'.
  // Swagger JSDoc membaca file dari ROOT project (sejajar package.json)
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

// --- DEBUGGER CANGGIH ---
// Kita cek apakah file-nya ketemu
console.log("---------------------------------------------------");
console.log("🔍 DEBUG SWAGGER PATHS:");
if (Object.keys(swaggerSpec.paths).length === 0) {
  console.log("❌ KOSONG! File route tidak terbaca.");
  console.log("👉 Pastikan folder 'src/routes' ada dan berisi file .ts");
} else {
  console.log("✅ BERHASIL! Rute ditemukan:", Object.keys(swaggerSpec.paths));
}
console.log("---------------------------------------------------");
// ------------------------

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  Logger.info(`📚 Docs available at http://localhost:${port}/docs`);
};
