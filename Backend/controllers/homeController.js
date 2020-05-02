const express = require('express');
const homeRoute = express.Router();

homeRoute.get('/', (request, response) => {
    response.sendFile('index.html', { root: './wwwroot' });
});

homeRoute.get('/js/main.js', (request, response) => {
    response.sendFile('main.js', { root: './wwwroot/js' });
});

homeRoute.get('/js/main.js.map', (request, response) => {
    response.sendFile('main.js.map', { root: './wwwroot/js' });
});

module.exports = homeRoute;
