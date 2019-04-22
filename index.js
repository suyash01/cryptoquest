const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Connecting to the DB
mongoose.connect('mongodb://localhost/cryptoquest', { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('open', () => {
    console.log("Connected to the DB");
});

mongoose.connection.on('error', () => {
    console.log("Error connecting to the DB");
});

const user = require("./routes/user");
const chals = require("./routes/chals");

// Middleware Setup
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'));

// Importing Routes
app.use("/user", user);
app.use("/chals", chals);

// Setting Up Error Messages and Status
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: 0,
        error: error.message
    });
});

// Starting the Server
app.listen(port, () => {
    console.log("Listening on port: " + port);
});