const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const logger = require('morgan');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middleware/error');
const connectDB = require('./src/config/conn');

const authRouter = require('./src/routes/auth');

// Load env vars
dotenv.config({ path: './src/config/config.env' });

// test change

// Connect to database
connectDB();

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(errorHandler);

// hello world route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `App running in ${NODE_ENV} mode at http://127.0.0.1:${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
