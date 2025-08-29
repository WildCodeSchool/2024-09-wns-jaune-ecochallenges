import path from 'node:path';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use('/files', express.static(path.join(__dirname, '../public')));

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

const port = 4000;

app.listen(port, () => {
  console.info(`Serveur Express en écoute sur le port ${port}`);
});
