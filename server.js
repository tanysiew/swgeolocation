const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const compression = require('compression');

dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Express
const app = express();

//Body-parser
app.use(express.json());

app.use(compression());
//Enable cors
app.use(cors());

//Set statis folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/v1/stores', require('./routes/stores'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));