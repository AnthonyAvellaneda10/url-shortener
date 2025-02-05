import { pool } from "../db/connectPostgreSQL";

export const getUrlListhortCode = async () => {
    const response = await pool.query("SELECT * FROM urls ORDER BY updated_at DESC");
     // Agregar CLIENT_BASE_URL a cada objeto en la lista
     const list = response.rows.map(row => ({
        ...row,
        host: process.env.CLIENT_BASE_URL, 
    }));
    console.log("Datos obtenidos de PostgreSQL:", list); // 👀 Verifica datos en consola
    return list;
};

export const getUrlByShortCode = async (shortCode: string) => {
    const response = await pool.query(
        "SELECT id, url, short_code, created_at, updated_at, access_count FROM urls WHERE short_code = $1",
        [shortCode]
    );
    return response.rows[0];
};

export const createUrl = async (url: string, shortCode: string) => {
    const response = await pool.query(
        "INSERT INTO urls (url, short_code) VALUES ($1, $2) RETURNING id, url, short_code, created_at, updated_at, access_count",
        [url, shortCode]
    );
    return response.rows[0];
};

export const updateUrl = async (shortCode: string, newUrl: string) => {
    const response = await pool.query(
        "UPDATE urls SET url = $1, updated_at = NOW() WHERE short_code = $2 RETURNING id, url, short_code, created_at, updated_at, access_count",
        [newUrl, shortCode]
    );
    return response.rows[0];
};

export const deleteUrl = async (shortCode: string) => {
    const {rowCount} = await pool.query("DELETE FROM urls WHERE short_code = $1", [shortCode]);

    return {rowCount};
};

export const incrementAccessCount = async (shortCode: string) => {
    await pool.query(
        "UPDATE urls SET access_count = access_count + 1 WHERE short_code = $1",
        [shortCode]
    );
};