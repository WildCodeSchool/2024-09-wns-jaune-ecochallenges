import { client } from './lib/api';
import http from 'http';

console.log('Node.js application started');
console.log('Apollo client initialized:', !!client);

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head><title>Eco Challenges</title></head>
      <body>
        <h1>Eco Challenges Frontend</h1>
        <p>Node.js server is running successfully!</p>
        <p>Apollo client: ${!!client ? 'Initialized' : 'Failed'}</p>
      </body>
    </html>
  `);
});

// Listen on port 3000
const PORT = 5173;
server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
