import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

//init express application
dotenv.config();
const app = express();
// body parser !!IMP!! -- helps to accept json data in body
app.use(express.json());
// connect to mongodb
connectDB(process.env.MONGO_URI);
//init PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
