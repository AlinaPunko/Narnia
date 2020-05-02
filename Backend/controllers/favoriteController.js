const express = require('express');
const favoriteRoute = express.Router();
const favoriteRepository = require('../api/favoriteBook')
const middleware = require('../middlewares/checkJwt');

favoriteRoute.get('/Get', middleware.checkToken, async (request, response) => {
    try {
        const favoriteBooks = await favoriteRepository.getByUserId(request.query.userId).map(book => book.bookId);
        response.statusCode = 200;
        response.setHeader('content-type', 'application/json');
        response.json(favoriteBooks)
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect data" });
    }
});

favoriteRoute.post('/Delete', middleware.checkToken, express.json({ type: '*/*' }), (request, response) => {
    try {
        favoriteRepository.delete(request.body);
        response.statusCode = 200;
        response.send("Ok");
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect data" });
    }
});

favoriteRoute.post('/Add', middleware.checkToken, express.json({ type: '*/*' }), (request, response) => {
    try {
        favoriteRepository.add(request.body);
        response.send("Ok");
    }
    catch {
        response.statusCode = 400;
        response.json({ message: "Incorrect data" });
    }
});

module.exports = favoriteRoute;