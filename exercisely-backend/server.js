import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// routes import
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

//init express application
dotenv.config();
const app = express();
// body parser !!IMP!! -- helps to accept json data in body
app.use(express.json());
// connect to mongodb
connectDB(process.env.MONGO_URI);
//init PORT
const PORT = process.env.PORT || 5000;

// ROUTES

app.use('/api/v1/users', userRoutes);

//fallback for 404 errors - not found
app.use(notFound);

//error middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
