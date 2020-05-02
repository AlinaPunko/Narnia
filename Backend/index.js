const Express = require('express');
const bodyParser = require('body-parser')

const config = require('./config').server;

const app = new Express();
var expressWs = require('express-ws');
var expressWs = expressWs(Express());
var aWss = expressWs.getWss('/');
const expressApp = expressWs.app;

const homeRoute = require('./controllers/homeController');
const usersRoute = require('./controllers/userController');
const authorsRoute = require('./controllers/authorController');
const categoriesRoute = require('./controllers/categoryController');
const booksRoute = require('./controllers/bookController');
const favoritesRoute = require('./controllers/favoriteController');
const commentsRoute = require('./controllers/commentController');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use('/', homeRoute);
app.use('/Books', booksRoute);
app.use('/Users', usersRoute);
app.use('/FavoriteBooks', favoritesRoute);
app.use('/Authors', authorsRoute);
app.use('/Categories', categoriesRoute);
expressApp.ws('/', function (ws) {
    ws.onmessage = function (msg) {
        commentsRoute(msg, ws, aWss);
    };
})

app.get('*', function (req, res) {
    res.sendfile('./wwwroot/index.html');
});

app.listen(config.port, config.host, async () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});
expressApp.listen(4000);
