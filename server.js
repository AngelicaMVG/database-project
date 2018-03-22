const express = require('express');
const { Model } = require('objection');
const bodyParser = require('body-parser');
const cors = require('cors');
//Import ORM

const apiRouter = require('./src/routes/apiRouter.js');
const studentsRouter = require('./src/routes/studentsRouter.js');

const connectToDb = require('./src/database/dbConnect.js');
const dbConfigObj = require('./knexfile');

const app = express();
const PORT = process.env.PORT || 3001;

const appDb = connectToDb(dbConfigObj.development);
Model.knex(appDb);
app.locals.db = appDb;

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', apiRouter);
app.use('/students', studentsRouter);

app.listen(PORT, () => {
  console.log(`APP LISTENING ON ${PORT}`);
});
