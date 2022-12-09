const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./routes/minions');
const ideasRouter = require('./routes/ideas');
const {} = require('./db')

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
