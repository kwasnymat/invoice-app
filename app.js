import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import feedRoutes from './routes/feed.js';
import authRoutes from './routes/auth.js';
import config from 'config';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

const db = config.get('mongo');

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
