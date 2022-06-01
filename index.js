import express from 'express';
import bodyParser from 'body-parser';

//init express application

const app = express();

const PORT = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('[TEST]!');
  res.send('Hello from homepage');
});

//make listen the application
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
