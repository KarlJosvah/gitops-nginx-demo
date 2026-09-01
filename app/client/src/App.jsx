import React, { useState, useEffect } from 'react';

export function App() {
	const [status, setStatus] = useState(null);

	useEffect(() => {
		fetch('/api/v1/health')
			.then((res) => res.json())
			.then((data) => setStatus(data))
			.catch((err) => console.error("Error fetching status:", err));
	}, []);

	return (
		<div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
			<h1>GitOps React Dashboard</h1>
			<p>Frontend served directly from Express inside Kubernetes.</p>
			<hr />
			<h2>Backend Health Status</h2>
			{status ? (
				<div style={{ background: '#e2f0d9', padding: '1rem', borderRadius: '8px' }}>
					<p><strong>Status:</strong> {status.status}</p>
					<p><strong>Uptime:</strong> {Math.floor(status.uptime)} seconds</p>
					<p><strong>Timestamp:</strong> {status.timestamp}</p>
				</div>
			) : (
				<p>Loading API data...</p>
			)}
		</div>
	);
}

export default App;