/* =========== importing modules =========== */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config/development';
import routes from './routes';
import morgan from 'morgan';


/* --------------- Mongo DB --------------- */

// Connect mongodb
mongoose.Promise = bluebird;
mongoose.connect(config.database);

// Connect mongodb
mongoose.connection.on('connected', () => {
    console.log('Connected to Database ' + config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});


/* ---------------   App  --------------- */

// creating express server
const app = express();

// Port Number for running server
const port = process.env.PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// Log requests to terminal
app.use(morgan('dev'));

// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Index Route
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Invalid endpoint -- use /api ');
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});