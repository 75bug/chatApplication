// external imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import loginRouter from './router/loginRouter.js';
import usersRouter from './router/usersRouter.js';
import inboxRouter from './router/inboxRouter.js';

// internal imports
import { notFoundHandler, errorHandler } from './middlewares/common/errorHandler.js';


const app = express();
dotenv.config();

const __dirname = path.resolve();

//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)

.then(() => console.log("Database connection successful."))
.catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
} )