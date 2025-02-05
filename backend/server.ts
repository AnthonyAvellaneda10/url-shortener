import express from 'express';
import shortenRoute from './routes/shorten.routes';
import { createClient } from 'redis';

import dotenv from 'dotenv';

import swaggerUI from "swagger-ui-express";
import specs from './swagger/swagger';

import cors from 'cors';

dotenv.config();

const app = express();

// Connecting to redis
export const client = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

app.use(cors());

app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(shortenRoute);

const PORT = process.env.PORT || 3000;

const main = async () => {
  await client.connect();
  app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}

main();