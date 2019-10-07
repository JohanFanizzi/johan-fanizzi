import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import publicRouter from './routes/public.routes';
import router from './routes/index.routes';
import history from 'connect-history-api-fallback';
import path from 'path';

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

// Middlewares Vue History
app.use(history());

// Static Files
app.use(express.static(path.join(__dirname, '..', '/dist/public')));

export default app;
