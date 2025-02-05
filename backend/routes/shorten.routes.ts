import { Router } from "express";
import {
    createShortUrl,
    deleteShortUrl,
    getShortenCode,
    getUrlStats,
    updateShortUrl,
    redirectToOriginalUrl,
    getAllShortUrl,
} from "../controllers/shorten.controllers";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     urls:
 *       type: object
 *       required:
 *         - url
 *         - short_code
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID auto-generado de la URL.
 *         url:
 *           type: string
 *           description: La URL original que se desea acortar.
 *         short_code:
 *           type: string
 *           description: El código corto único asociado a la URL.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora en que se creó la URL.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora en que se actualizó la URL.
 *         access_count:
 *           type: integer
 *           description: El número de veces que se ha accedido a la URL.
 *       example:
 *         id: 1
 *         url: "https://www.example.com"
 *         short_code: "abc123"
 *         created_at: "2023-10-01T12:00:00Z"
 *         updated_at: "2023-10-01T12:00:00Z"
 *         access_count: 0
 */

/**
 * @swagger
 * tags:
 *   name: Short URL
 *   description: The short URL managing API
 */


/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Crear una URL corta
 *     tags: [Short URL]
 *     description: Obtine la lista de todas las URL cortas creadas a partir de una URL larga.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: La URL larga que se desea acortar.
 *                 example: https://www.example.com
 *     responses:
 *       200:
 *         description: Devuelve toda la lista.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/shorten/list", getAllShortUrl);

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Crear una URL corta
 *     tags: [Short URL]
 *     description: Crea una nueva URL corta a partir de una URL larga.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: La URL larga que se desea acortar.
 *                 example: https://www.example.com
 *     responses:
 *       201:
 *         description: URL corta creada exitosamente.
 *       400:
 *         description: Error en la solicitud (por ejemplo, URL no válida).
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/shorten/:shortCode", getShortenCode);

/**
 * @swagger
 * /shorten/{shortCode}:
 *   get:
 *     summary: Obtener la URL original
 *     tags: [Short URL]
 *     description: Obtiene la URL original asociada a un código corto.
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: El código corto de la URL.
 *     responses:
 *       200:
 *         description: URL original encontrada.
 *       404:
 *         description: Código corto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/shorten", createShortUrl);

/**
 * @swagger
 * /shorten/{shortCode}:
 *   put:
 *     summary: Actualizar una URL corta
 *     tags: [Short URL]
 *     description: Actualiza la URL original asociada a un código corto.
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: El código corto de la URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: La nueva URL larga.
 *                 example: https://www.newexample.com
 *     responses:
 *       200:
 *         description: URL corta actualizada exitosamente.
 *       400:
 *         description: Error en la solicitud (por ejemplo, URL no válida).
 *       404:
 *         description: Código corto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/shorten/:shortCode", updateShortUrl);

/**
 * @swagger
 * /shorten/{shortCode}:
 *   delete:
 *     summary: Eliminar una URL corta
 *     tags: [Short URL]
 *     description: Elimina una URL corta y su asociación con la URL original.
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: El código corto de la URL.
 *     responses:
 *       200:
 *         description: URL corta eliminada exitosamente.
 *       404:
 *         description: Código corto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/shorten/:shortCode", deleteShortUrl);

/**
 * @swagger
 * /shorten/{shortCode}/stats:
 *   get:
 *     summary: Obtener estadísticas de una URL corta
 *     tags: [Short URL]
 *     description: Obtiene las estadísticas de acceso de una URL corta.
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: El código corto de la URL.
 *     responses:
 *       200:
 *         description: Estadísticas de la URL corta.
 *       404:
 *         description: Código corto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/shorten/:shortCode/stats", getUrlStats);

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirigir a la URL original
 *     tags: [Short URL]
 *     description: Redirige al usuario a la URL original asociada a un código corto.
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: El código corto de la URL.
 *     responses:
 *       301:
 *         description: Redirección exitosa a la URL original.
 *       404:
 *         description: Código corto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:shortCode", redirectToOriginalUrl); // Nueva ruta para redirección

export default router;