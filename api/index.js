import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
// Path to the db.json relative to this file
// Vercel serverless functions are execution environment aware.
// We point to the db.json in the project root.
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Optional: Rewrites if needed, but vercel.json handles it better
server.use(router);

export default server;
