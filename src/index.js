import express, {
  json,
} from 'express';
import cors from 'cors';
import { dbConnection } from './config';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(json());
server.use(cors());

server.use(routes);

const { PORT } = process.env;

server.listen(PORT, async () => {
  await dbConnection.sync();
  console.log(`Server Ready in http://localhost:${PORT}`);
});
