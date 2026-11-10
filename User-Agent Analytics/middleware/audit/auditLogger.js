import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.join(__dirname, '../logs/request.json');
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

let logInfo = new Map();

try {
    const saved = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
    logInfo = new Map(Object.entries(saved));
} catch (err) {
    if (err.code !== 'ENOENT') {
        console.error('Could not load old logs, starting fresh:', err.message);
    }
}

export const auditLogger = (req, res, next) => {
    const curAgent = req.headers['user-agent'];

    logInfo.set(curAgent, (logInfo.get(curAgent) || 0) + 1);


    fs.writeFileSync(logFilePath, JSON.stringify(Object.fromEntries(logInfo), null, 2));

    next();
}