const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to mongodb'));
db.once('open', () => console.log('Connection to mongodb is open!'));

app.get('/', (req, res) => res.send('Hello WORLD'));

app.listen(port, () => console.log(`listening on port ${port}.`));
