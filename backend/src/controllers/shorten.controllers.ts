import { Request, Response } from "express";
import { createUrl, deleteUrl, getUrlByShortCode, incrementAccessCount, updateUrl, getUrlListhortCode } from "../models/shorten.models";
import { nanoid } from "nanoid";
import validator from "validator";
import axios from "axios";
import { client } from "../server";

export const getAllShortUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificar si la lista está en la caché de Redis
        const cachedList = await client.get("list");

        if (cachedList) {
            console.log("Usando datos de la caché:", JSON.parse(cachedList)); // 👀 Depurar contenido
            res.status(200).json(JSON.parse(cachedList));
            return;
        }

        // Si no está en la caché, obtener la lista de la base de datos
        const list = await getUrlListhortCode();
        // console.log("Consultando PostgreSQL:", list); // 👀 Depurar contenido de la DB

        // Almacenar la lista en Redis
        await client.set("list", JSON.stringify(list));

        res.status(200).json(list);
    } catch (error) {
        console.error("Error en getAllShortUrl:", error);
        res.status(500).json({ error: "Error al obtener la lista de URL" });
    }
};

export const getShortenCode = async (
    req: Request<{ shortCode: string }>, // ✅ Especificamos que shortCode es un parámetro de la URL
    res: Response
): Promise<void> => {  // ✅ Declaramos que esta función no devuelve un `Response`, sino `void`
    try {
        const { shortCode } = req.params;

        // Verificar si la URL está en la caché de Redis
        const cachedUrl = await client.get(shortCode);

        if (cachedUrl) {
            console.log("Usando datos de la caché");
            res.status(200).json(JSON.parse(cachedUrl)); // No usar `return` aquí
            return; // Asegúrate de salir de la función
        }

        const url = await getUrlByShortCode(shortCode);

        if (!url) {
            res.status(404).json({ message: `El identificador ${shortCode} no existe` });
            return;
        }

        // Incrementar el contador de accesos
        await incrementAccessCount(shortCode);

        // Almacenar la URL en Redis con un tiempo de expiración
        const saveResult = await client.set(shortCode, JSON.stringify(url))
        console.log("Resultado de guardar en caché:", saveResult);

        res.status(200).json(url);
    } catch (error) {
        console.error("Error en getShortenCode:", error);
        res.status(500).json({ error: "Error al obtener la URL" });
    }
};

export const createShortUrl = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { url } = req.body;

        // Validar que la URL sea válida
        if (!url || !validator.isURL(url)) {
            res.status(400).json({ error: "Invalid URL" });
            return;
        }

        // Validar que la URL sea accesible
        try {
            await axios.head(url); // Hacer una solicitud HEAD para verificar la URL
        } catch (error) {
            res.status(400).json({ error: "The URL is not accessible" });
            return;
        }

        const shortCode = nanoid(6); // Generar un código corto único
        const newUrl = await createUrl(url, shortCode);

        // 🔥 Eliminar la lista en caché para que se actualice en la próxima consulta
        await client.del("list");

        res.status(201).json({ message: "The short URL was created" });
    } catch (error) {
        console.error("Error en createShortUrl:", error);
        res.status(500).json({ error: "Error al crear la URL" });
    }
};

export const updateShortUrl = async (
    req: Request<{ shortCode: string }>,
    res: Response
): Promise<void> => {
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

        // 🔥 Invalidar la caché de la lista
        await client.del("list");

        res.status(200).json(updatedUrl);
    } catch (error) {
        console.error("Error en updateShortUrl:", error);
        res.status(500).json({ error: "Error al actualizar la URL" });
    }
};

export const deleteShortUrl = async (
    req: Request<{ shortCode: string }>,
    res: Response
): Promise<void> => {
    try {
        const { shortCode } = req.params;
        const { rowCount } = await deleteUrl(shortCode);

        if (rowCount === 0) {
            res.status(404).json({ message: "Short code not found" });
            return;
        }

        // 🔥 Invalidar la caché de la lista
        await client.del("list");

        res.status(200).json({ message: "Short code deleted" });
    } catch (error) {
        console.error("Error en deleteShortUrl:", error);
        res.status(500).json({ error: "Error al eliminar la URL" });
    }
};

export const getUrlStats = async (
    req: Request<{ shortCode: string }>,
    res: Response
): Promise<void> => {
    try {
        const { shortCode } = req.params;

        // Verificar si las estadísticas están en la caché de Redis
        const cachedStats = await client.get(`stats:${shortCode}`);

        if (cachedStats) {
            console.log("Usando datos de la caché");
            res.status(200).json(JSON.parse(cachedStats));
            return;
        }

        // Si no está en la caché, buscarla en la base de datos
        const url = await getUrlByShortCode(shortCode);

        if (!url) {
            res.status(404).json({ message: `El identificador ${shortCode} no existe` });
            return;
        }

        // Almacenar las estadísticas en Redis con un tiempo de expiración
        const saveResult = await client.set(`stats:${shortCode}`, JSON.stringify(url));
        console.log("Resultado de guardar en caché:", saveResult);

        res.status(200).json(url);
    } catch (error) {
        console.error("Error en getUrlStats:", error);
        res.status(500).json({ error: "Error al obtener las estadísticas" });
    }
};

export const redirectToOriginalUrl = async (
    req: Request<{ shortCode: string }>,
    res: Response
): Promise<void> => {
    try {
        const { shortCode } = req.params;

        // Buscar la URL original en la base de datos
        const url = await getUrlByShortCode(shortCode);

        if (!url) {
            res.status(404).json({ message: "URL no encontrada" });
            return;
        }

        // Incrementar el contador de accesos en la base de datos
        await incrementAccessCount(shortCode);

        // Actualizar la caché de Redis con los nuevos datos
        const updatedUrl = await getUrlByShortCode(shortCode); // Obtener los datos actualizados
        // 🔥 Eliminar la lista en caché para que se actualice en la próxima consulta
        await client.del("list");

        // Redirigir al usuario a la URL original
        res.redirect(301, url.url);
    } catch (error) {
        console.error("Error en redirectToOriginalUrl:", error);
        res.status(500).json({ error: "Error al redirigir a la URL" });
    }
};