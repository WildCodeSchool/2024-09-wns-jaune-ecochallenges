import { client } from './lib/api';

console.log('Node.js application started');
console.log('Apollo client initialized:', !!client);

// Keep the process running
console.log('Application is running... Press Ctrl+C to exit');

// Keep alive
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  process.exit(0);
});

// Keep the process running indefinitely
setInterval(() => {
  // Heartbeat to keep alive
}, 60000); // Every minute
