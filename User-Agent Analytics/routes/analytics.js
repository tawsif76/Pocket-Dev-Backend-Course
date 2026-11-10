import { Router } from 'express';
import { fileURLToPath } from 'node:url';
import {
    downloadReport,
    getAllusers
} from '../controllers/userAgentsController.js';

const router = Router();


const analyticsPage = fileURLToPath(
    new URL('../public/analytics.html', import.meta.url)
);

router.get('/report.csv', downloadReport);
router.get('/', (req, res) => {
    res.sendFile(analyticsPage);
});
router.get('/user-agents', getAllusers);

export default router;