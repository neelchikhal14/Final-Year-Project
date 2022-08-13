import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// routes import
import userRoutes from './routes/userRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

//middlewares
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
app.use('/api/v1/exercise', exerciseRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/patient', patientRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/exercisely-frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, 'exercisely-frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

//fallback for 404 errors - not found
app.use(notFound);

//error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
