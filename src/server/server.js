const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const history = require('connect-history-api-fallback');

const serverConf = require('./conf/server');
const dbConf = require('./conf/db');

const authApi = require('./controllers/auth.controller');
const postsApi = require('./controllers/posts.controller');
const userApi = require('./controllers/user.controller');

const pageInfoApi = require('./controllers/page-info.controller');

// Use native promises
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(history({
    rewrites: [
        { from: /\/auth/, to: context => context.parsedUrl },
    ],
}));

app.use(express.static('public'));

app.use(expressSession({
    name: serverConf.sessionCookieName,
    secret: serverConf.secretKey,
    resave: false,
    saveUninitialized: false,
}));

authApi(app);

app.use('/api', postsApi());
app.use('/api', userApi());
app.use('/', pageInfoApi());

mongoose.connect(`mongodb://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.dbName}`);
mongoose.connection
    .on('error', (err) => console.log(err))
    .once('open', () => {
        console.log('Connection to DB successful.');
        app.listen(serverConf.port, () => console.log(`Server is listening http://${serverConf.host}:${serverConf.port}.`));
    });
