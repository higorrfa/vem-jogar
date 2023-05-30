import express from 'express';
import router from './routes/index';
import cors from 'cors';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server Running PORT: ${PORT}`);
});
export { app };