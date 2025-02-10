import express from 'express';
import shortenRoute from './src/routes/shorten.routes';
import { createClient } from 'redis';

import dotenv from 'dotenv';

import swaggerUI from "swagger-ui-express";
import specs from './src/swagger/swagger';

import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connecting to redis
export const client = createClient({
  url : process.env.REDIS_URL
});

app.use(cors());

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(shortenRoute);

const main = async () => {
  await client.connect();
  app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}

main();