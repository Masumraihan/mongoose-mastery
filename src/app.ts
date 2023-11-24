import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/module/User.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routers
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
