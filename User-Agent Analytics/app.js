import express from 'express';
import { auditLogger } from './middleware/audit/auditLogger.js';
import router from './routes/analytics.js';

const app = express();

app.use('/analytics', auditLogger, router)

app.listen(5000, () => console.log("server running on port 5000"));
