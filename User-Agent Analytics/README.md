# User-Agent Analytics

A simple Node.js and Express app that records User-Agent headers, counts requests for each full user-agent string, and displays the results in a Chart.js bar chart. Reports can also be downloaded as CSV.

## Run locally

Install Node.js and npm, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:5000/analytics](http://localhost:5000/analytics).

## Routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/analytics` | Display the bar chart and CSV download link. |
| GET | `/analytics/user-agents` | Return user-agent request counts as JSON. |
| GET | `/analytics/report.csv` | Download `user-agent-report.csv`. |

## How it works

- `middleware/audit/auditLogger.js` reads the User-Agent header and saves counts in `middleware/logs/request.json`. Saved counts are loaded when the server restarts.
- `service/userData.js` reads the saved data, and `controllers/userAgentsController.js` returns JSON or CSV.
- `public/analytics.html` fetches the JSON and draws the chart in the browser.

Every request under `/analytics` is counted, including JSON and CSV requests. Opening the chart normally adds two requests: one for the HTML page and one for its JSON data. Refresh the page to update the chart.
