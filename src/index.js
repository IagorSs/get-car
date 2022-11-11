import express, {
  json,
} from 'express';
import session from 'express-session';
import cors from 'cors';
import { dbConnection } from './config';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(session({
  secret: "aabb",
  resave: true,
  saveUninitialized: true
}));
server.use(json());
server.use(cors());

server.use(routes);

const { PORT, DB_NAME } = process.env;

dbConnection
  .sync()
  .then(() => console.log(`Banco de dados conectado: ${DB_NAME}`));

server.listen(PORT, () => {
  console.log(`Server Ready in http://localhost:${PORT}`);
});
