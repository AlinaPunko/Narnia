const express = require('express');
const authorRepository = require('../api/author')
const authorRoute = express.Router();
const middleware = require('../middlewares/checkJwt');

authorRoute.get('/', async (request, response) => {
    const authors = await authorRepository.getAll();
    response.json(authors);
});

authorRoute.get('/Get', async (request, response) => {
    const author = await authorRepository.getById(request.query.id);
    if (author) {
        response.json(author[0]);
    }
    else {
        response.statusCode = 400;
        response.json({ message: "Incorrect data" });
    }
});

authorRoute.post('/Add', middleware.checkToken, express.json({ type: '*/*' }), async (request, response) => {
    try {
        let promise = new Promise((resolve, reject) => {
            authorRepository.add(request.body);
            resolve();
        })
        promise.then(() => {
            response.statusCode = 200;
            response.setHeader('content-type', 'application/json');
            response.json('Ok')
        })
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect data" });
    }
});

authorRoute.put('/Update', middleware.checkToken, express.json({ type: '*/*' }), async (request, response) => {
    try {
        let promise = new Promise((resolve, reject) => {
            authorRepository.update(request.body);
            resolve();
        })
        promise.then(() => {
            response.statusCode = 200;
            response.setHeader('content-type', 'application/json');
            response.json('Ok')
        })
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect data" });
    }
});

module.exports = authorRoute;