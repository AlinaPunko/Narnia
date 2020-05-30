const express = require('express');
const ordersRepository = require('../api/order')
const orderToBookRepository = require('../api/orderToBook')
const ordersRoute = express.Router();
const middleware = require('../middlewares/checkJwt');

ordersRoute.post('/Add', middleware.checkToken, express.json({ type: '*/*' }), async (request, response) => {
    try {
        let promise = new Promise(async (resolve, reject) => {
            const orderInfo = {
                customerId: request.body.userId,
                sum: request.body.totalPrice,
                date: new Date()
            }

            const newOrder = await ordersRepository.add(orderInfo);

            for (const book of request.body.books) {
                orderToBookRepository.add({
                    bookId: book.id,
                    orderId: newOrder.id,
                    amount: book.amount
                })
            }
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
})

module.exports = ordersRoute;