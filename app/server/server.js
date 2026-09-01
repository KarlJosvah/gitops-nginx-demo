const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// API endpoints
app.get('/api/v1/health', (req, res) => {
	res.json({
		status: 'healthy',
		uptime: process.uptime(),
		timestamp: new Date().toISOString()
	});
});

// Serve compiled React static assets from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route: serves React's index.html for client-side routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});