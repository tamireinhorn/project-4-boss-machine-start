const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routes/minions');
const {} = require('./db')

apiRouter.use('/minions', minionsRouter);


module.exports = apiRouter;
