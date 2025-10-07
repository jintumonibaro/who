
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan'); //http request logger middleware
const path = require('path');

const {env} = require('./config/env');
const {errorHandler} = require('./middleware/error');

const app = express();

//enable CORS  for all routes
app.use(cors());

//set security-related HTTP headers
app.use(helmet());

//log http requests to the console
app.use(morgan('dev'));

//parse incoming JSON requests
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
app.get('/', (req, res) => {
    res.json({message: "Event Management & Ticketing Platform APi is running!"});
});

//error handling middleware
app.use(errorHandler);

//start the server
const PORT = env.port;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${env.nodeEnv}`);
    console.log(`App Base URL: ${env.appBaseUrl}`);
});


