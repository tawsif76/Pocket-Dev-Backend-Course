import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.join(__dirname, '..', 'middleware', 'logs', 'request.json');

export const userData = () => {
    return JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
}