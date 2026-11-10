import { userData } from '../service/userData.js';

export const getAllusers = (req, res) => {
    const data = userData();
    res.status(200).json(data);
}

export const downloadReport = (req, res) => {
    const data = userData();

    const rows = ['User Agent,Requests'];

    for (const [agent, count] of Object.entries(data)) {
        // Escape double quotes, then wrap the field in quotes.
        const escapedAgent = `"${agent.replace(/"/g, '""')}"`;

        rows.push(`${escapedAgent},${count}`);
    }

    const csv = rows.join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
        'Content-Disposition',
        'attachment; filename="user-agent-report.csv"'
    );

    res.send(csv);
};