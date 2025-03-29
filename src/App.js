import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [message, setMessage] = useState("Loading...");
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		// testing connection to backend api
		const apiUrl = process.env.REACT_APP_API_URL || '';
		console.log(apiUrl);
		console.log("hello world");
		fetch(`${apiUrl}/v1/api/health/isAlive`)
			.then(response => {
				if (response.ok) return response.json();
				throw new Error('Network response was not ok');
			})
			.then(data => {
				console.log(data);
				setMessage(data.message);
				setConnected(true);
			})
			.catch(error => {
				console.error('Error fetching data: ', error);
				setMessage("Could not connect to server. Backend may not be running yet.");
				setConnected(false);
			})
	}, []);




	return (
		<div className="App">
		<header className="App-header">
			<h1>Casey and Yasmim's Wedding</h1>
			<p>We're getting married! More details coming soon.</p>
			<div className="connection-status">
				<h3>Backend Connection Status:</h3>
				<p style={{color: connected ? 'green' : 'red'}}>
					{connected ? 'Connected to backend ✓' : 'Not connected to backend ✗'}
				</p>
				<p>{message}</p>
			</div>
		</header>
		</div>
	);
}

export default App;
