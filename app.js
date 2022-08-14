import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import mongoDbConnection from './config/database.js';
import env from './utils/env.js';
import errorHandler from './middlewares/errorHandler.js';

var app = express();

// DB configuration and connection create
mongoDbConnection(mongoose, env.uri).connectToMongo();

app.use(cors())
app.use("/images", express.static("images"));

// setup routes
// routes(app, express);
// app.use(errorHandler);

app.listen(env.port, () => console.log("Listening to port", env.port));