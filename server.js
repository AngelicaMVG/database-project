const express = require('express');
const { Model } = require('objection');
const bodyParser = require('body-parser');
const cors = require('cors');
//Import ORM

const apiRouter = require('./src/routes/apiRouter.js');
const studentsRouter = require('./src/routes/studentsRouter.js');
const authRouter = require('./src/routes/authRouter.js');

const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile');

const app = express();
const PORT = process.env.PORT || 3001;

const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const registerLocalStrategy = require('./src/middleware/passport-local--registerLocalStrategy.js');
const {
  configDeserializeUser,
  configSerializeUser
} = require('./src/helpers/passport-local--sessionActions.js');

let dbConnectionConfig;

if (process.env.NODE_ENV === 'production') {
  dbConnectionConfig = dbConfigObj.production;
} else {
  dbConnectionConfig = dbConfigObj.development;
}

const appDb = connectToDb(dbConfigObj.development);

Model.knex(appDb);
app.locals.db = appDb;

// Cookie Parse + Cookie Session middleware
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'cookiemonster',
    secret: 'superdupersupersecret',
    httpOnly: true,
    signed: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(registerLocalStrategy());
passport.serializeUser(configSerializeUser());
passport.deserializeUser(configDeserializeUser());

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', apiRouter);
app.use('/students', studentsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`APP LISTENING ON ${PORT}`);
});
