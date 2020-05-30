const express = require('express');
const usersRepository = require('../api/user')
const usersRoute = express.Router();
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const config = require('../config.json').jwtSecret;
const middleware = require('../middlewares/checkJwt');

usersRoute.post('/Register', express.json({ type: '*/*' }), async (request, response) => {
    try {
        let promise = new Promise(async (resolve, reject) => {
            const salt = crypto.randomBytes(10).toString('hex');
            const user = {
                name: request.body.name,
                email: request.body.email,
                birthdate: request.body.birthdate ? request.body.birthdate : null,
                address: request.body.address,
                phone: request.body.phone,
                salt,
                hashedPassword: crypto.createHash('sha256').update(request.body.password.concat(salt)).digest('base64')
            }
            const result = await usersRepository.add(user);
            if (result.error) {
                reject();
            }
            resolve();
        })
        promise.then(async () => {
            response.statusCode = 200;
            response.setHeader('content-type', 'application/json');
            const user = await usersRepository.getByEmail(request.body.email);
            let token = jwt.sign({ username: request.body.email }, config);
            response.json({
                id: user[0].id,
                role: user[0].role,
                token: token
            }) 
        })
            .catch(() => {
                response.statusCode = 400;
                response.json({ message: "Incorrect user" });
            })
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect user" });
    }
});

usersRoute.post('/Login', express.json({ type: '*/*' }), async (request, response) => {
    try {
        const user = await usersRepository.getByEmail(request.body.email);
        if (!user[0]) {
            response.statusCode = 400;
            response.json({ message: "Incorrect user" });
        }

        const salt = user[0].salt;
        const password = crypto.createHash('sha256').update(request.body.password.concat(salt)).digest('base64');

        if (user[0].hashedPassword === password) {
            let token = jwt.sign({ username: request.body.email }, config);
            response.statusCode = 200;
            response.setHeader('content-type', 'application/json')
            response.json({
                id: user[0].id,
                role: user[0].role,
                token: token
            });
        }
        else {
            response.statusCode = 400;
            response.json({ message: "Incorrect user" });
        }
    }
    catch{
        response.statusCode = 200;
        response.json({ message: "Incorrect user" });
    }
});

usersRoute.put('/Update', middleware.checkToken, express.json({ type: '*/*' }), async (request, response) => {
    console.log('update');
    try {
        if (request.body.birthdate === '') {
            request.body.birthdate = null;
        }
        console.log(await usersRepository.update(request.body));
        response.statusCode = 200;
        response.send("Ok");
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect user" });
    }
});

usersRoute.get('/Get', async (request, response) => {
    try {
        const user = await usersRepository.getById(request.query.id);

        if (user) {
            response.statusCode = 200;
            response.setHeader('content-type', 'application/json')
            response.json(user[0]);
        }
        else {
            response.statusCode = 400;
            response.json({ message: "Incorrect user" });
        }
    }
    catch{
        response.statusCode = 400;
        response.json({ message: "Incorrect user" });
    }
});

module.exports = usersRoute;