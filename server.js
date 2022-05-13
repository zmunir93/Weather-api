if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const API_ACCES_KEY = process.env.API_ACCES_KEY;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'))

app.post('/weather', (req, res) => {

})

app.get('/', (req, res) => {
    res.send('Welcome to Home Page')
});

app.listen(3000, () => {
    console.log('Server has starter')
});