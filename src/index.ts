import express from 'express';
import cors from 'cors';
import config from '../config';
import { bilingualContentRoutes } from './routes';

const app = express();

app.use(cors());
const port = config.port;

// Middleware to parse JSON bodies
app.use(express.json());

bilingualContentRoutes(app);

app.listen(port, () => {
  console.log(`## Server is running at http://localhost:${port}`);
  console.log('## port: ', port);
});
