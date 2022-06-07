if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const API_ACCES_KEY = process.env.API_ACCES_KEY;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('docs'))

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs/index.html'));
})