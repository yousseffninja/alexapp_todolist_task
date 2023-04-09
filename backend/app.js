const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.cookies);
    next();
});

module.exports = app;