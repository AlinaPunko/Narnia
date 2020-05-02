const express = require('express');
const categoryRepository = require('../api/category')
const categoryRoute = express.Router();

categoryRoute.get('/', async (request, response) => {
    const categories = await categoryRepository.getAll();
    response.json(categories);
});

module.exports = categoryRoute;