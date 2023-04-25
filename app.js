const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const routes = require('./routes/index');

mongoose.connect(DB_ADDRESS);
app.use(requestLogger);
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors());
app.use(express.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
