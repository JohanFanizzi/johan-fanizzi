import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRouter from './routes/public.routes';
import router from './routes/index.routes';

// Initializations
const app = express();
dotenv.config();

// Setting
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/public', publicRouter);
app.use('/api', router);

export default app;
