import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import env from './utils/env.js';
import mongoDbConnection from './config/database.js';
import routes from './services/all_routes.js';
import errorHandler from './middlewares/errorHandler.js';

var app = express();

// DB configuration and connection create
mongoDbConnection(mongoose, env.uri).connectToMongo();

app.use(cors())
app.use("/images", express.static("images"));

app.use(bodyParser.json())

// setup routes
routes(app);
app.use(errorHandler);

app.listen(env.port, () => console.log("Listening to port", env.port));