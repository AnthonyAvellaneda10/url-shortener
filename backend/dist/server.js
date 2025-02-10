import express, { Router } from 'express';
import pg from 'pg';
import 'dotenv/config';
import { nanoid } from 'nanoid';
import validator from 'validator';
import axios from 'axios';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
process.env.PORT || 5e3;

const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
  // Convertir a número,
  ssl: { rejectUnauthorized: false }
  // 🔹 Se agrega SSL para Neon
});

const getUrlListhortCode = async () => {
  const response = await pool.query("SELECT * FROM urls ORDER BY updated_at DESC");
  return response.rows;
};
const getUrlByShortCode = async (shortCode) => {
  const response = await pool.query(
    "SELECT id, url, short_code, created_at, updated_at, access_count FROM urls WHERE short_code = $1",
    [shortCode]
  );
  return response.rows[0];
};
const createUrl = async (url, shortCode) => {
  const response = await pool.query(
    "INSERT INTO urls (url, short_code) VALUES ($1, $2) RETURNING id, url, short_code, created_at, updated_at, access_count",
    [url, shortCode]
  );
  return response.rows[0];
};
const updateUrl = async (shortCode, newUrl) => {
  const response = await pool.query(
    "UPDATE urls SET url = $1, updated_at = NOW() WHERE short_code = $2 RETURNING id, url, short_code, created_at, updated_at, access_count",
    [newUrl, shortCode]
  );
  return response.rows[0];
};
const deleteUrl = async (shortCode) => {
  const { rowCount } = await pool.query("DELETE FROM urls WHERE short_code = $1", [shortCode]);
  return { rowCount };
};
const incrementAccessCount = async (shortCode) => {
  await pool.query(
    "UPDATE urls SET access_count = access_count + 1 WHERE short_code = $1",
    [shortCode]
  );
};

const getAllShortUrl = async (req, res) => {
  try {
    const cachedList = await client.get("list");
    if (cachedList) {
      console.log("Usando datos de la cach\xE9:", JSON.parse(cachedList));
      res.status(200).json(JSON.parse(cachedList));
      return;
    }
    const list = await getUrlListhortCode();
    await client.set("list", JSON.stringify(list));
    res.status(200).json(list);
  } catch (error) {
    console.error("Error en getAllShortUrl:", error);
    res.status(500).json({ error: "Error al obtener la lista de URL" });
  }
};
const getShortenCode = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const cachedUrl = await client.get(shortCode);
    if (cachedUrl) {
      console.log("Usando datos de la cach\xE9");
      res.status(200).json(JSON.parse(cachedUrl));
      return;
    }
    const url = await getUrlByShortCode(shortCode);
    if (!url) {
      res.status(404).json({ message: `El identificador ${shortCode} no existe` });
      return;
    }
    await incrementAccessCount(shortCode);
    const saveResult = await client.set(shortCode, JSON.stringify(url));
    console.log("Resultado de guardar en cach\xE9:", saveResult);
    res.status(200).json(url);
  } catch (error) {
    console.error("Error en getShortenCode:", error);
    res.status(500).json({ error: "Error al obtener la URL" });
  }
};
const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !validator.isURL(url)) {
      res.status(400).json({ error: "Invalid URL" });
      return;
    }
    try {
      await axios.head(url);
    } catch (error) {
      res.status(400).json({ error: "The URL is not accessible" });
      return;
    }
    const shortCode = nanoid(6);
    const newUrl = await createUrl(url, shortCode);
    await client.del("list");
    res.status(201).json({ message: "The short URL was created" });
  } catch (error) {
    console.error("Error en createShortUrl:", error);
    res.status(500).json({ error: "Error al crear la URL" });
  }
};
const updateShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "URL es requerida" });
      return;
    }
    const updatedUrl = await updateUrl(shortCode, url);
    if (!updatedUrl) {
      res.status(404).json({ message: `El identificador ${shortCode} no existe` });
      return;
    }
    await client.del("list");
    res.status(200).json(updatedUrl);
  } catch (error) {
    console.error("Error en updateShortUrl:", error);
    res.status(500).json({ error: "Error al actualizar la URL" });
  }
};
const deleteShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { rowCount } = await deleteUrl(shortCode);
    if (rowCount === 0) {
      res.status(404).json({ message: "Short code not found" });
      return;
    }
    await client.del("list");
    res.status(200).json({ message: "Short code deleted" });
  } catch (error) {
    console.error("Error en deleteShortUrl:", error);
    res.status(500).json({ error: "Error al eliminar la URL" });
  }
};
const getUrlStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const cachedStats = await client.get(`stats:${shortCode}`);
    if (cachedStats) {
      console.log("Usando datos de la cach\xE9");
      res.status(200).json(JSON.parse(cachedStats));
      return;
    }
    const url = await getUrlByShortCode(shortCode);
    if (!url) {
      res.status(404).json({ message: `El identificador ${shortCode} no existe` });
      return;
    }
    const saveResult = await client.set(`stats:${shortCode}`, JSON.stringify(url));
    console.log("Resultado de guardar en cach\xE9:", saveResult);
    res.status(200).json(url);
  } catch (error) {
    console.error("Error en getUrlStats:", error);
    res.status(500).json({ error: "Error al obtener las estad\xEDsticas" });
  }
};
const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await getUrlByShortCode(shortCode);
    if (!url) {
      res.status(404).json({ message: "URL no encontrada" });
      return;
    }
    await incrementAccessCount(shortCode);
    const updatedUrl = await getUrlByShortCode(shortCode);
    await client.del("list");
    res.redirect(301, url.url);
  } catch (error) {
    console.error("Error en redirectToOriginalUrl:", error);
    res.status(500).json({ error: "Error al redirigir a la URL" });
  }
};

const router = Router();
router.get("/shorten/list", getAllShortUrl);
router.get("/shorten/:shortCode", getShortenCode);
router.post("/shorten", createShortUrl);
router.put("/shorten/:shortCode", updateShortUrl);
router.delete("/shorten/:shortCode", deleteShortUrl);
router.get("/shorten/:shortCode/stats", getUrlStats);
router.get("/:shortCode", redirectToOriginalUrl);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Short URL API",
      version: "1.0.0",
      description: "API for managing short URLs",
      contact: {
        name: "Anthony Avellaneda"
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Local server"
        }
      ]
    }
  },
  apis: ["./backend/routes/*.ts"]
};
const specs = swaggerJsdoc(options);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5e3;
const client = createClient({
  url: process.env.REDIS_URL
});
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(router);
const main = async () => {
  await client.connect();
  app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
};
main();

export { client };
